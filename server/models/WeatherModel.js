class DayWeatherModel {
  constructor(
    country = "",
    date = "",
    text = "",
    icon = "",
    tempc = "",
    wind_mph = "",
    humidity = ""
  ) {
    this.country = country;
    this.date = date;
    this.text = text;
    this.icon = icon;
    this.tempc = tempc;
    this.wind_mph = wind_mph;
    this.humidity = humidity;
  }
}

module.exports = DayWeatherModel;
