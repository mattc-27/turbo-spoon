import React, { useState, useEffect, createContext } from 'react';
import { Backgrounds } from './Backgrounds';
import { getRandomItem } from './weatherServices';

const WeatherContext = createContext();

function WeatherProvider({ children }) {

    const [location, setLocation] = useState({});
    const [currentConditions, setCurrentConditions] = useState('');
    const [background, setBackground] = useState('');


    useEffect(() => {
        //const userData = JSON.parse(localStorage.getItem('userDetails'))
        console.log(location);
        localStorage.setItem('weatherConditions', JSON.stringify(currentConditions));
        console.log(currentConditions)
    }, [currentConditions])

    
function getBackground(response) {

    if (response.country !== 'United States of America') {
        const locationImages = Backgrounds.countries.find(({ country }) => country === response.country)
            const currentImage = getRandomItem(locationImages.images)
            setBackground(`url(${currentImage.value})`)
    } else {
        const locationImages = Backgrounds.images.find(({ region }) => region === response.region)
        if (locationImages.names === undefined) {
            const currentImage = getRandomItem(locationImages.images)
            setBackground(`url(${currentImage.value})`)
            debugger;
        } else {
            const currentCity = locationImages.names.find(({ name }) => name === response.name)
            if (currentCity === undefined) {
                const currentImage = getRandomItem(locationImages.images)
                setBackground(`url(${currentImage.value})`)
                debugger;
            } else {
                const result = getRandomItem(currentCity.images)
                setBackground(`url(${result.value})`)
                debugger;
            }
        }
    }
}


    return (
        <WeatherContext.Provider value={{ location, setLocation, setCurrentConditions, currentConditions, getBackground, setBackground, background }}>
            {children}
        </WeatherContext.Provider>
    );
}

export { WeatherContext, WeatherProvider };