const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const deviceCtrl = require('../controllers/device');

router.post('/create', deviceCtrl.create);
router.get('/all', auth, deviceCtrl.getAllDevices);
router.put('/:id', auth, deviceCtrl.modifyDevice);
module.exports = router;