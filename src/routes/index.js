const express = require('express');
const router = express.Router();

const authRoutes    = require('./authRoutes');
const pegawaiRoutes = require('./pegawaiRoutes');

router.use(authRoutes);
router.use(pegawaiRoutes);

module.exports = router;