import React, { useContext } from 'react';

import { WeatherContext } from '../WeatherContext';

import { LiaWindSolid, LiaCloudSunSolid } from "react-icons/lia";
import { WiFog } from "react-icons/wi";

export function AddlData() {

    const { currentConditions } = useContext(WeatherContext);

    return (
        <>
            <div className='conditions-item'>
                <LiaWindSolid size={70} className='conditions-item-icon' />
                <p>{currentConditions.wind_mph}mph, {currentConditions.wind_dir}</p>
            </div>
            <div className='conditions-item'>
                <LiaCloudSunSolid size={75} className='conditions-item-icon' />
                <p>{currentConditions.cloud}%</p>
            </div>
            <div className='conditions-item'>
                <WiFog size={80} className='conditions-item-icon' />
                <p>{currentConditions.vis_miles}mi</p>
            </div>
        </>
    );
}