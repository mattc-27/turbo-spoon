import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineGithub } from 'react-icons/ai';
import logoA from '../../logoA.png';
export function Footer() {

    return (
        <footer >
            <div className='footer-content' >
                <div className='footer-main'>
                    <div className='footer-title'>
                        <a href="/">
                            <h3>weatherwhale.cloud</h3></a>
                    </div>
                    <div className='footer-logo'>
                        <img src={logoA}
                        />
                    </div>
                </div>
                <div className='footer-right'>
                    <div className='footer-text'>
                        <p>Weather data from <br /> <a href='https://www.weatherapi.com/'>weatherapi.com</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}