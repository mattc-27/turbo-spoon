import { WeatherIcons } from "./WeatherIcons";

export async function getWeatherData(query) {
  const { q } = query;
  const searchUrl = `${q}`;
  try {
    const response = await fetch(`/api/weather/${searchUrl}`)
    const data = await response.json();
    console.log(data);
    const formattedWeather = formatWeather(data);
    return { success: true, ...formattedWeather };
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
}

const formatWeather = (data) => {
  const {
    location: { name, region, country, localtime },
    current: { temp_f, condition, wind_mph, wind_dir, humidity, pressure_in, cloud, vis_miles },
    forecast: { forecastday },
    alerts: { alert }
  } = data

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
    alert
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