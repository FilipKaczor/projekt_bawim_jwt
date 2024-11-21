const express = require('express')
const router = express.Router()
const authController = require('../controllers/authContr')

router.post('/', authController.handleLogin)

module.exports = router;