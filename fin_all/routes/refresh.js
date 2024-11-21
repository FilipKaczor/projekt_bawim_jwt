const express = require('express')
const router = express.Router()
const refreshTokenControler = require('../controllers/refreshTokenContr')

router.get('/', refreshTokenControler.handleRefreshToken)

module.exports = router;