const express = require('express');
const router = express.Router();

// Import controllers
const lightingController = require('../controllers/lightingController');
const audioController = require('../controllers/audioController');
const atmosphericsController = require('../controllers/atmosphericsController');
const bleController = require('../controllers/bleController');

// Lighting endpoints
router.get('/lighting', lightingController.getLightingStatus);
router.post('/lighting', lightingController.updateLighting);

// Audio endpoints
router.get('/audio', audioController.getAudioStatus);
router.post('/audio', audioController.updateAudio);

// Atmospherics endpoints
router.get('/atmospherics', atmosphericsController.getAtmosphericsStatus);
router.post('/atmospherics', atmosphericsController.updateAtmospherics);

// BLE endpoints
router.get('/ble', bleController.getBLEStatus);
router.post('/ble', bleController.updateBLE);

module.exports = router;
