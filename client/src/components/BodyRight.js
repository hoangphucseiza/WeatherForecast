import React, { useEffect, useState } from "react";
import ForecastCard from "./ForecastCard";
import { useDispatch, useSelector } from "react-redux";
import { TYPES } from "../redux/actions/apiAction";
import axios from "axios";
import { apiURL } from "../utils/apiURL";

const BodyRight = () => {
  const { api } = useSelector((state) => state);
  const [data, setData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `${apiURL}/weather?name=${api.city}&forecast=${api.forecast}`
      )
      .then((res) => {
        setData(res.data);
        dispatch({ type: TYPES.GET_DATA, payload: res.data });
        dispatch({ type: TYPES.OFFALERT, payload: '' });

      })
      .catch((err) => {
        dispatch({ type: TYPES.ONALERT, payload: err.response.data.message });
      });
  }, [api.city, api.forecast, dispatch, setData]);

  const handleLoadMore = () => {
    if (data.forecastWeather.length < 10) {
      dispatch({ type: TYPES.CHANGE_FORECAST, payload: api.forecast + 2 });
    }else{
      dispatch({ type: TYPES.CHANGE_FORECAST, payload: 4 });

    }
  };
  return (
    <div className="BodyRight">
      <div className="current_day">
        <div className="current_day_info">
          <h4>
            {data?.currentWeather.country} ({data?.currentWeather.date})
          </h4>
          <p>Temperature: {data?.currentWeather.tempc}°C</p>
          <p>Wind: {data?.currentWeather.wind_mph} M/S</p>
          <p>Humidity: {data?.currentWeather.humidity}%</p>
        </div>
        <div className="current_day_status">
          <img src={data?.currentWeather.icon} alt="weather_icon" />
          <p>{data?.currentWeather.text}</p>
        </div>
      </div>
      <div className="forecast_day">
        <h3 className="forecast_day_title">
          {data?.forecastWeather.length}-Day Forecast
        </h3>
        <div className="forecast_day_info">
          {data?.forecastWeather.map((forecastday, index) => (
            <ForecastCard forecastday={forecastday} />
          ))}
        </div>
        <div className="w-100 button_loadmore">
          <button
            className="btn btn-light mt-4"
            style={{ background: "#353B49", color: "#fff", fontWeight: "400" }}
            onClick={handleLoadMore}
          >
            {api.forecast < 10 ? "Load More" : "Load Less"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default BodyRight;
