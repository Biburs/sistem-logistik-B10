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

// Semua route pegawai wajib login dan punya role pegawai
router.use(authMiddleware);
router.use(isPegawai);

// Dashboard Pegawai
router.get('/', pegawaiController.showDashboard);

module.exports = router;