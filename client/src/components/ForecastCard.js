import React from 'react'

const ForecastCard = ({forecastday}) => {
  return (
    <div className='forecast_day_card'>
        <h4>({forecastday.date})</h4>
        <img src={forecastday.icon} alt='weather_icon'/>
        <p>Temperature: {forecastday.tempc}°C</p>
        <p>Wind: {forecastday.wind_mph} M/S</p>
        <p>Humidity: {forecastday.humidity}%</p>
    </div>
  )
}

export default ForecastCard
