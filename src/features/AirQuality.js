import React, { useEffect, useState, useContext } from 'react';
import { WeatherContext } from '../WeatherContext';


export default function AirQuality({ data }) {


    function airEpa(props) {
        console.log(props)

        const bgColor =
            props <= 50 ? { text: 'Good', color: '#3cc675d4' } :
                props <= 100 ? { text: 'Moderate', color: '#67a5f6ac' } :
                    props <= 150 ? { text: 'Unhealthy for some groups', color: '#f6ef67c5' } :
                        props <= 200 ? { text: 'Unhealthy', color: '#f6ef67c5' } :
                            props <= 300 ? { text: 'Very unhealthy', color: '#ef6e37a5' } :
                                props > 300 ? { text: 'Hazardous', color: '#ef6e37a5' } :
                                    { text: 'moderate', color: '#ff2b2b82' }

        return (
            <div className='aq-card'
                style={{
                    backgroundColor: `${bgColor.color}`,
                    opacity: '90%'
                }}>
                <div className='aq-card-data' >
                    <p>{props}
                    </p>
                    <p style={{ fontSize: '1.25em', alignSelf: 'center' }}>{bgColor.text}
                    </p>
                </div>
                <div className='aq-card-text'>
                    <p id="aqi"><em>EPA Air Quality Index*</em></p>
                </div>

            </div>
        )
    }

    return (

        airEpa(data)

    )
}