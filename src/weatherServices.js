
import { WeatherIcons } from "./WeatherIcons";

// Fetch IQAir data
async function getAirQuality(lat, lon) {
  try {
    const response = await fetch(`/api/air-quality?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data.data.current.pollution.aqius;
  } catch (error) {
    console.error('Failed to fetch air quality data:', error);
    return null;
  }
}


// Fetch weather data
export async function getWeatherData(query) {
  const { q } = query;

  const searchUrl = `${q}`;
  let lat, lon;

  // Check if q contains coordinates
  if (q.includes(',')) {
    [lat, lon] = q.split(',').map(coord => coord.trim());
  } else {
    // If q is not coordinates, you might want to geocode it here
    // For now, we'll just use it as is for the weather API
    lat = lon = null;
  }

  try {

    const weatherPromise = fetch(`/api/weather/${q}`);


    const airQualityPromise = lat && lon ? getAirQuality(lat, lon) : Promise.resolve(null);

    const [ weatherResponse, airQuality ] = await Promise.all([ weatherPromise, airQualityPromise ]);


    const weatherData = await weatherResponse.json();


    const weather = { data: weatherData, airQuality };

    const formattedWeather = formatWeather(weather);

    return { success: true, ...formattedWeather };

  } catch (error) {

    console.error('Error fetching weather or air quality data:', error);

    throw new Error('Failed to fetch weather data');

  }
}



// Format weather data
const formatWeather = (weather) => {
  const {
    location: { name, region, country, localtime },
    current: { temp_f, condition, wind_mph, wind_dir, humidity, pressure_in, cloud, vis_miles, gust_mph, feelslike_f },
    forecast: { forecastday },
    alerts: { alert },
  } = weather.data

  const airQuality = weather.airQuality;

  const formatIcon = WeatherIcons.find(({ code }) => code === condition.code)

  const sun = [
    {
      name: 'sunrise',
      time: forecastday[0].astro.sunrise
    },
    {
      name: 'sunset',
      time: forecastday[0].astro.sunset
    }
  ]

  const hourlyForecast = forecastday[0].hour;

  const hourlyTemp = [
    {
      name: 'day1',
      day: forecastday[0]
    },
    {
      name: 'day2',
      day: forecastday[1]
    },
    {
      name: 'day3',
      day: forecastday[2]
    }
  ]


  const hourlyData = forecastday[0].hour.map((item) => ({
    time: item.time,
    temp_f: item.temp_f
  }))


  const isValid = true;
  const startTime = 7
  const endTime = 19
  const formattedTime = parseInt(localtime.split(" ")[1])
  // set weather data
  const isDay = formattedTime >= startTime && formattedTime <= endTime ? true
    : false


  return {
    name,
    region,
    country,
    temp_f,
    condition,
    wind_mph,
    wind_dir,
    humidity,
    pressure_in,
    forecastday,
    formatIcon,
    isValid,
    sun,
    localtime,
    formattedTime,
    isDay,
    cloud,
    vis_miles,
    alert,
    hourlyForecast,
    hourlyTemp,
    hourlyData,
    airQuality
    //isDay,
    //formattedTime
  };
};

export function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);
  // get random item
  const item = arr[randomIndex];
  return item;
}

