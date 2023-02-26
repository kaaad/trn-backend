const express = require('express')
const merchantCtrl = require('../controllers/merchantCtrl')

const router = express.Router()

router.post('/merchant', merchantCtrl.merchantPage)
router.post('/login', merchantCtrl.login)
router.post('/verify', merchantCtrl.verifyOtp)

module.exports = router;