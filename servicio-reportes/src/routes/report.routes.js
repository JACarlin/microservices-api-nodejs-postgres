const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.use(authenticateToken);

router.post('/', reportController.createReport);
router.get('/', reportController.getAllReports);
router.get('/my-reports', reportController.getMyReports);
router.get('/:id', reportController.getReportById);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);
router.patch('/:id/status', reportController.updateReportStatus);
router.get('/by-user/:userId', reportController.getReportsByUserId);

module.exports = router;