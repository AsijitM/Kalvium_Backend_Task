const express = require('express');

// local import
// using controllers to keep it clean
const { getHistory } = require('../controllers/getHistory');

// express router
const router = express.Router();


// history Route
router.get('/', getHistory);

module.exports = router;
