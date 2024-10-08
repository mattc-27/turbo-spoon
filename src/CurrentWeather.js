import React, { useState, useContext, useEffect } from 'react';
import { WeatherContext } from './WeatherContext';

import { Hourly } from './components/Hourly';

import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { CiLocationOn, CiDroplet, CiWarning } from "react-icons/ci";
import { LiaWindSolid, LiaCloudSunSolid } from "react-icons/lia";
import { WiFog } from "react-icons/wi";
import { BsSunrise, BsSunset } from "react-icons/bs";
import AirQuality from './features/AirQuality';

export default function CurrentWeather() {

    const { currentConditions, background } = useContext(WeatherContext);

    const [showHourly, setShowHourly] = useState(null);
    const [showAlerts, setShowAlerts] = useState(null);
    const [mobile, setMobile] = useState(false);

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

    const [width, setWidth] = useState(window.innerWidth);



    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 740) {
                setMobile(true)
            } else {
                setMobile(false)
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        console.log(width)
    }, [setWidth])

    const iconSize = width > 780 ? 40 : 35;


    return (
        <div className='container'>
            <div className='current-weather'>
                <div className='main-weather conditions-bg'>
                    <div className='conditions-current'>
                        <div className='conditions-main'>
                            <div className='conditions-main-top'>
                                <div className='conditions-text'>
                                    <p id='currentTemp'>{currentConditions.temp_f.toFixed()}°F</p>
                                </div>
                                <div className='conditions-text'>
                                    <p id='currentText'>{currentConditions.condition.text}</p>
                                </div>
                            </div>
                            <div className='current-top-col'>
                                <div className='wx-icon'>
                                    <div className='icon-card'>
                                        {mobile ? currentConditions.formatIcon.daily : currentConditions.formatIcon.value}
                                    </div>
                                </div>
                                {currentConditions.airQuality ?
                                    <div className='air-quality'>
                                        <AirQuality data={currentConditions.airQuality} />
                                    </div>
                                    : null}
                            </div>
                        </div>
                        <div className='conditions-location'>
                            <div className='location-text'>
                                <h2>{currentConditions.name}, {currentConditions.region}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='conditions-current'>
                        <div className='card-border'>
                            <div className='conditions-row'>
                                <div className='conditions-item'>
                                    <FaTemperatureArrowUp size={iconSize - 5} className='conditions-item-icon' />
                                    <p>{currentConditions.forecastday[0].day.maxtemp_f}°F</p>
                                </div>
                                <div className='conditions-item'>
                                    <FaTemperatureArrowDown size={iconSize - 5} className='conditions-item-icon' />
                                    <p>{currentConditions.forecastday[0].day.mintemp_f}°F</p>
                                </div>
                            </div>
                            <div className='conditions-row'>
                                <div className='conditions-item'>
                                    <LiaWindSolid size={iconSize} className='conditions-item-icon' />
                                    <p>{currentConditions.wind_mph}mph, {currentConditions.wind_dir}</p>
                                </div>
                                <div className='conditions-item'>
                                    <LiaCloudSunSolid size={iconSize} className='conditions-item-icon' />
                                    <p>{currentConditions.cloud}%</p>
                                </div>
                            </div>
                            <div className='conditions-row'>
                                <div className='conditions-item'>
                                    <WiFog size={iconSize} className='conditions-item-icon' />
                                    <p>{currentConditions.vis_miles}mi</p>
                                </div>
                                <div className='conditions-item'>
                                    <CiDroplet size={iconSize} className='conditions-item-icon' />
                                    <p>{currentConditions.humidity}%</p>
                                </div>
                            </div>
                            <div className='conditions-row'>
                                {currentConditions.sun.map((item) => (
                                    <div className='conditions-item'>
                                        <>
                                            {item.name === "sunrise" ? <BsSunrise size={iconSize} className='conditions-item-icon' />
                                                : <BsSunset size={iconSize} className='conditions-item-icon' />
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
