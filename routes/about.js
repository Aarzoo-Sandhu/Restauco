const express = require('express');
const router = express.Router();
const aboutView = require('../controller/about');

router.get('/', aboutView);

module.exports = router;