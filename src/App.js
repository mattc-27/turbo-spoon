import React from 'react';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

import { WeatherProvider } from './WeatherContext';
import Layout from './Layout';

import './style.css';

// GA Tracking
 ReactGA.initialize([
    {
        trackingId: ''
    }
]);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,

    }]);

export default function App() {

    return (
        <WeatherProvider>
            <RouterProvider router={router} />
        </WeatherProvider>
    );
}