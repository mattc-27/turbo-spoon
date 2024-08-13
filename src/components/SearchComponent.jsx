import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import logoB from '../../logoB.png';

export function SearchComponent({ setQuery }) {

    const [predictions, setPredictions] = useState([]);
    const [searchInput, setSearchInput] = useState({ p: '' });

    const clearInput = () => {
        setSearchInput({ p: '' });
    };

    const handleChange = (e) => {
        setSearchInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
            { input: searchInput.p },
            (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    setPredictions(predictions);
                }
            }
        );
    };

    const handleClick = (prediction) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId: prediction.place_id }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
                const location = results[0].geometry.location;
                const queryVariable = `${location.lat()},${location.lng()}`;
                console.log(queryVariable);
                setQuery({ q: queryVariable });
                clearInput();
            }
        });
    };

    const handleButtonClick = () => {
        const queryVariable = searchInput.p
        setQuery({ q: queryVariable })
    }


    return (
        <header >
            <div className='header-content'>
                <div className='header-main'>
                    <div className='header-title'>
                        <a href="/">
                            <h1>WeatherWhale</h1></a>
                    </div>
                    <div className='header-logo'>
                        <img
                            src={logoB} />
                    </div>
                </div>
                <Toaster containerStyle={{
                    position: 'absolute',
                    zIndex: '999999999999999999',
                    top: '5%'
                }} />
            </div>

            <div className='search-component'/* style={{position: 'absolute', zIndex: '99999', top: '90px'}}/* style={{position: 'absolute', zIndex: '100000', top: '30%'}}  style={{position: 'absolute', zIndex: '9999999', top: '10%'}}*/ >
                <div className='search-inputs ' style={{}} >
                    {/*  <GoLocation size={30} style={{ color: "#394867", margin: '1px' }} /> */}
                    <input type='text' onChange={handleChange}
                        value={searchInput.p}
                        name='p'
                        placeholder='Search a city or postal code'
                    />
                    {/*        {predictions.length === 0 &&
                    <button onClick={handleButtonClick}
                        className="searchButton"
                        id="searchTest"
                    >
                        Search
                    </button>
                }
                */}
                </div>
                {searchInput.p.length != 0 && predictions.length >= 1 && (
                    <div className="dataResult  " style={{ alignSelf: 'center' }}>
                        <div className='results'>
                            {predictions.map((prediction) => {
                                return (
                                    <p
                                        key={prediction.place_id}
                                        onClick={() => handleClick(prediction)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {prediction.description}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}