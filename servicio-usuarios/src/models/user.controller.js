const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteUser = async (req, res) => {
    if (req.user.id == req.params.id) {
        return res.status(400).json({ error: 'Cannot delete your own admin account' });
    }
    try {
        const deletedUser = await User.deleteById(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: `User ${deletedUser.email} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.changeUserRole = async (req, res) => {
    const { role } = req.body;
    if (!role || !['user', 'admin'].includes(role)) {
        return res.status(400).json({ error: "Role must be 'user' or 'admin'" });
    }
    try {
        const updatedUser = await User.updateRole(req.params.id, role);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};