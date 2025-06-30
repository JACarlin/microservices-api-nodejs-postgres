const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth.middleware');

const adminAccess = [authenticateToken, authorizeAdmin];

router.get('/', adminAccess, userController.getAllUsers);
router.get('/:id', adminAccess, userController.getUserById);
router.delete('/:id', adminAccess, userController.deleteUser);
router.patch('/:id/role', adminAccess, userController.changeUserRole);

module.exports = router;