const express = require('express');
const { getHistory } = require('../controllers/getHistory');

const router = express.Router();

router.get('/', getHistory);

module.exports = router;
