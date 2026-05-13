const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const pegawaiRoutes = require('./pegawaiRoutes');

router.use(authRoutes);

router.use('/admin', adminRoutes);
router.use('/pegawai', pegawaiRoutes);

module.exports = router;