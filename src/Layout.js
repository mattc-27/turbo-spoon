import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { SearchComponent } from './components/SearchComponent';
import { Footer } from './components/Footer';

import { WeatherContext } from './WeatherContext';
import { getWeatherData, getRandomItem } from './weatherServices';
import { WeatherPuns } from './data.js';

const CurrentWeather = lazy(() => import('./CurrentWeather'))

export default function Layout() {

    const [query, setQuery] = useState({ q: '' });
    const [weather, setWeather] = useState('');

    const { currentConditions, setCurrentConditions, background, getBackground } = useContext(WeatherContext);

    useEffect(() => {

        const loadingMsg = getRandomItem(WeatherPuns.messages);

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
                        success: {
                            duration: 2000,
                            icon: null
                        },
                    },
                )
                // set weather data
                console.log(response)
                setCurrentConditions(response)
                await getBackground(response)

            } catch (error) {
                console.error(error.message)
            }
        }
        fetchData()
            .catch(console.error);
    }, [query]);


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
                    <CurrentWeather background={background} />
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