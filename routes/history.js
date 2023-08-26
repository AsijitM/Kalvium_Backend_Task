const express = require('express')
const { getHistory } = require('../middleware/historySave')

const router = express.Router()

router.get('/',getHistory)



module.exports=router