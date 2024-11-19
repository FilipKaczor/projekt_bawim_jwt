const express = require('express')
const router = express.Router()
const handle_contr = require('../controllers/main_contr')

router.get('/', handle_contr.handle_main)

module.exports = router;