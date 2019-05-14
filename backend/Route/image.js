const express = require('express');

const { imageController } = require('../Controller/imageController');

const router = express.Router();

router.post('/upload', imageController);

module.exports = router;