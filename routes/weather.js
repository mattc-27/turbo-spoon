const express = require('express')
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get(`/weather/:searchUrl`, weatherController.getWeather);

module.exports = router;