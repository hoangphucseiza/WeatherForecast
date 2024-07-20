const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const HistorySchema = require("./models/HistoryModel");
const DayWeatherModel = require("./models/WeatherModel");
const UserSchema = require("./models/userModels");
const crypto = require("crypto");
 const sendEmailService = require("./services/EmailService");
require("dotenv").config();

const app = express();
app.use(cors());

//Router
// Get API and Add History API
app.get("/weather", async (req, res) => {
  const name = req.query.name;
  const forecast = req.query.forecast;
  const apiData = `http://api.weatherapi.com/v1/forecast.json?key=568a22b4a753434b85f55059241807&q=${name}&days=${forecast}&aqi=no&alerts=no`;

  try {
    const response = await axios.get(apiData);
    const data = response.data;
    const currentWeather = new DayWeatherModel();
    currentWeather.country = data.location.name;
    currentWeather.date = data.location.localtime.split(" ")[0];
    currentWeather.text = data.current.condition.text;
    currentWeather.icon = data.current.condition.icon;
    currentWeather.tempc = data.current.temp_c;
    currentWeather.wind_mph = data.current.wind_mph;
    currentWeather.humidity = data.current.humidity;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;
    // History API
    const history = new HistorySchema({
      country: data.location.name,
      date: currentDate,
      text: data.current.condition.text,
      icon: data.current.condition.icon,
      tempc: data.current.temp_c,
      wind_mph: data.current.wind_mph,
      humidity: data.current.humidity,
    });
    await history.save();
    const forecastWeather = data.forecast.forecastday.map((day) => {
      const forecast = new DayWeatherModel();
      forecast.date = day.date;
      forecast.tempc = day.day.avgtemp_c;
      forecast.wind_mph = day.day.maxwind_mph;
      forecast.humidity = day.day.avghumidity;
      forecast.text = day.day.condition.text;
      forecast.icon = day.day.condition.icon;
      return forecast;
    });
    res.json({
      currentWeather: currentWeather,
      forecastWeather: forecastWeather,
    });
  } catch (error) {
    res.status(500).json({ message: "Address not found, please enter again!" });
  }
});

// Get History API
app.get("/history", async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;
    await HistorySchema.deleteMany({ date: { $ne: currentDate } });
    const history = await HistorySchema.find({ date: currentDate });

    const uniqueData = history.filter(
      (value, index, self) =>
        self.findIndex((t) => t.country === value.country) === index
    );
    res.json(uniqueData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Subcribe Email
app.post("/subscribe", async (req, res) => {
  try {
    const email = req.query.email;
    const existUser = await UserSchema.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({ message: "Email already subscribed!" });
    }

    const user = new UserSchema({
      email: email,
      emailToken: crypto.randomBytes(64).toString("hex"),
    });
    await user.save();
    sendEmailService(user);
    res.json({
      message: "Successfully! Verify your gmail"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Verify Email
app.post("/verify", async (req, res) => {
  try {
    const emailToken = req.query.emailToken;

    if (!emailToken) {
      return res.status(400).json({ message: "Email Token NotFound" });
    }

    const user = await UserSchema.findOne({ emailToken: emailToken });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      res.json({ message: "Verify Success" });
    } else {
      res.status(400).json({ message: "Email Token Invalid!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Unsubcribe Email
app.post("/unsubscribe", async (req, res) => {
  try {
    const email = req.query.email;
    // Tìm người dùng theo email
    const user = await UserSchema.findOne({ email: email });
    if (user) {
      // Xóa người dùng
      await UserSchema.deleteOne({ email: email });
      res.json({ message: "Unsubscribe Success!" });
    } else {
      res
        .status(400)
        .json({ message: "Email not subscribed, please subscribe!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Connect MongoDB
const URI = "mongodb+srv://hoangphuc:hoangphuc123@cluster0.u0kobdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(URI, {
    dbName: "WeatherApp",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error:", error);
  });

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
