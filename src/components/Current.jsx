import React, { useContext } from 'react'
import { WeatherContext } from '../WeatherContext';
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { CiLocationOn, CiDroplet } from "react-icons/ci";
import { LiaWindSolid, LiaCloudSunSolid } from "react-icons/lia";
import { WiFog } from "react-icons/wi";
import { BsSunrise, BsSunset } from "react-icons/bs";

export function Current() {

    const { currentConditions } = useContext(WeatherContext);

    return (
        <>

            <div className='conditions-location'>
                <div className='conditions-main'>
                    <span className='wx-icon'>{currentConditions.formatIcon.value}</span>
                    <p id='currentTemp'>{currentConditions.temp_f.toFixed()}°F</p>
                    <p id='currentText'>{currentConditions.condition.text}</p>
                </div>
                <div className='location-text'>
                    <span id='locationIcon'><CiLocationOn size={50} /></span>
                    <h2>{currentConditions.name}, {currentConditions.region}</h2>
                </div>
            </div>

            <div className='conditions-location'>
                <div className='card-border'>
                    <div className='conditions-row'>
                        <div className='conditions-item'>
                            <FaTemperatureArrowUp size={40} className='conditions-item-icon' />
                            <p>{currentConditions.forecastday[0].day.maxtemp_f}°F</p>
                        </div>
                        <div className='conditions-item'>
                            <FaTemperatureArrowDown size={40} className='conditions-item-icon' />
                            <p>{currentConditions.forecastday[0].day.mintemp_f}°F</p>
                        </div>
                    </div>
                    <div className='conditions-row'>
                        <div className='conditions-item'>
                            <LiaWindSolid size={50} className='conditions-item-icon' />
                            <p>{currentConditions.wind_mph}mph, {currentConditions.wind_dir}</p>
                        </div>
                        <div className='conditions-item'>
                            <LiaCloudSunSolid size={50} className='conditions-item-icon' />
                            <p>{currentConditions.cloud}%</p>
                        </div>
                    </div>
                    <div className='conditions-row'>
                        <div className='conditions-item'>
                            <WiFog size={50} className='conditions-item-icon' />
                            <p>{currentConditions.vis_miles}mi</p>
                        </div>
                        <div className='conditions-item'>
                            <CiDroplet size={50} className='conditions-item-icon' />
                            <p>{currentConditions.humidity}%</p>
                        </div>
                    </div>
                    <div className='conditions-row'>
                        {currentConditions.sun.map((item) => (
                            <div className='conditions-item'>
                                <>
                                    {item.name === "sunrise" ? <BsSunrise size={50} className='conditions-item-icon' />
                                        : <BsSunset size={50} className='conditions-item-icon' />
                                    }
                                </>
                                <>
                                    <p> {item.time}</p>
                                </>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}