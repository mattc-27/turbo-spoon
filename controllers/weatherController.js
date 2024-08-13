const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Weather api 
const getWeather = async (req, res) => {
    const { searchUrl } = req.params;
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${searchUrl}&days=3`)
        const data = await response.json();
        res.send(data)
        console.log(data)
    } catch (error) {
        console.error(error.message)
    }
};

module.exports = {
    getWeather
}