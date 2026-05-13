const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Semua route admin wajib login dan punya role admin
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

// Dashboard admin
router.get('/', adminController.showDashboard);

module.exports = router;
