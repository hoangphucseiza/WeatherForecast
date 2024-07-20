import React from 'react'

const HistoryCard = ({history}) => {
  return (
    <div className='history_card'>
        <div className='history_card_info'>
            <h4>{history.country}</h4>
            <p>Temperature: {history.tempc}°C</p>
            <p>Wind: {history.wind_mph} M/S</p>
            <p>Humidity: {history.humidity}%</p>
        </div>
        <div className='history_card_status'>
            <img src={history.icon} style={{width: '50px', height: '50px'}} alt='weather_icon' />
            <p>{history.text}</p>
        </div>
    </div>
  )
}

export default HistoryCard
