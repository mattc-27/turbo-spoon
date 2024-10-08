import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { SearchComponent } from './components/SearchComponent';
import { Footer } from './components/Footer';

import { WeatherContext } from './WeatherContext';
import { getWeatherData, getRandomItem } from './weatherServices';
import { WeatherPuns } from './data.js';
import ReactGA from 'react-ga4';
const CurrentWeather = lazy(() => import('./CurrentWeather'))

export default function Layout() {

    const [query, setQuery] = useState({ q: '' });
    const [weather, setWeather] = useState('');

    const { currentConditions, setCurrentConditions, background, getBackground } = useContext(WeatherContext);

    useEffect(() => {

        const loadingMsg = getRandomItem(WeatherPuns.messages)

        const fetchData = async () => {
            try {
                const response = await toast.promise(getWeatherData(query), {
                    loading: `${loadingMsg.text}`,
                    success: `${loadingMsg.text}`,
                    error: 'Error when fetching',
                },
                    {
                        style: {
                            minWidth: '270px',
                            height: '120px',
                            background: '#fafafa',
                            color: '#252525',
                            fontFamily: 'Lato',
                            fontSize: '1.5em',
                            fontWeight: '500',
                            textAlign: 'center',
                        },
                    },
                )
                // set weather data
                console.log(response)
                setCurrentConditions(response)
                await getBackground(response)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()

            .catch(console.error);
    }, [query]);


    useEffect(() => {
        ReactGA.event({
            category: 'Weather query',
            action: 'Fetched weather',
            label: currentConditions.location
        })
    }, [currentConditions])

    function Loading() {
        return (
            <div className='loading' style={{ fontFamily: 'Lato', fontSize: '1.5em', fontWeight: '300' }}>
                <p><i>Coming up with weather puns is a breeze.</i></p>;
            </div>
        );
    }

    return (
        <div>
            <SearchComponent setQuery={setQuery} />
            <Toaster containerStyle={{
                position: 'absolute',
                zIndex: '999999999999999999',
                top: '5%'
            }} />
            <Suspense fallback={<Loading />}>
                {currentConditions && background ?
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <CurrentWeather background={background} />
                    </div>
                    : <div className='container'>
                        <div className='no-location'>
                            <div className='no-location-msg'>
                                <p>Enter location in search area</p>
                            </div>
                        </div>
                    </div>
                }
            </Suspense>
            <Footer />
        </div>
    )
}