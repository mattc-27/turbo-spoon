import React, { useState, useContext } from 'react';
import { WeatherContext } from './WeatherContext';

import { Hourly } from './components/Hourly';

import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { CiLocationOn, CiDroplet, CiWarning } from "react-icons/ci";
import { LiaWindSolid, LiaCloudSunSolid } from "react-icons/lia";
import { WiFog } from "react-icons/wi";
import { BsSunrise, BsSunset } from "react-icons/bs";


export default function CurrentWeather() {

    const { currentConditions, background } = useContext(WeatherContext);

    const [showHourly, setShowHourly] = useState(null);
    const [showAlerts, setShowAlerts] = useState(null);

    function handleHourly() {
        if (!showHourly) {
            setShowHourly(true)
        } else setShowHourly(false)
    }

    function handleAlerts() {
        if (!showAlerts) {
            setShowAlerts(true)
            console.log(currentConditions.alert[0].headline)
        } else setShowAlerts(false)
    }

    return (
        <div className='container'>
            <div className='current-weather'>
                <div className='main-weather conditions-bg'>
                    <div className='conditions-current'>
                        <div className='conditions-main'>
                            <div className='conditions-main-top'>
                                <p id='currentTemp'>{currentConditions.temp_f.toFixed()}°F</p>
                                <p id='currentText'>{currentConditions.condition.text}</p>
                            </div>
                            <div className='wx-icon'>{currentConditions.formatIcon.value}</div>
                        </div>
                        <div className='conditions-location'>
                            <div className='conditions-icon'><CiLocationOn size={50} /></div>
                            <div className='location-text'>
                                <h2>{currentConditions.name}, {currentConditions.region}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='conditions-current'>
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
                </div>
                <div className='img-container' style={{
                    backgroundImage: `${background}`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    /* opacity: currentConditions.isDay ? '80%' : '80%' */
                }}></div>
            </div>
            <div className='hourly-row'>
                {
                    currentConditions.forecastday[0].hour.filter((_, index) => index % 4 === 0).map(hour => (
                        <Hourly hour={hour} />
                    ))
                }
            </div>
        </div>
    );
}
