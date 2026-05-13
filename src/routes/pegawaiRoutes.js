/**
 * pegawaiRoutes.js
 * Definisi route untuk halaman-halaman khusus pegawai.
 * Author: Mahasiswa 3 - Taris Rafivdean
 */

const express = require('express');
const router = express.Router();

const pegawaiController = require('../controllers/pegawaiController');
const authMiddleware = require('../middleware/authMiddleware');
const { isPegawai } = require('../middleware/permissionMiddleware');

// Dashboard Pegawai
// Harus login (authMiddleware) DAN harus ber-role pegawai (isPegawai)
router.get('/pegawai', authMiddleware, isPegawai, pegawaiController.showDashboard);

module.exports = router;
