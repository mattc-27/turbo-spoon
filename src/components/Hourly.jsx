import React from 'react'
import { WeatherIcons } from "../WeatherIcons";

export function Hourly({ hour }) {

    const getIcon = (code) => {
        const iconData = WeatherIcons.find(({ code: iconCode }) => iconCode === code);
        return iconData ? iconData.forecast : null;
    };

    return (
        <div className='forecast-card' key={hour.time} >
            <div className='forecast-card-time'>
                <p>{hour.time.split(' ')[1]}</p>
            </div>
            <div className='forecast-card-conditions'>
                <p>{getIcon(hour.condition.code)}</p>
                <p>{hour.temp_f}°F</p>
                <p>{hour.condition.text}</p>
            </div>
        </div>
    );
}