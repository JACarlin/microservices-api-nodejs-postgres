const Report = require('../models/report.model');

exports.createReport = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    try {
        const report = await Report.create({ title, content, userId: req.user.id });
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllReports = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin role required' });
    }
    try {
        const reports = await Report.findAll();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getMyReports = async (req, res) => {
    try {
        const reports = await Report.findAllByUserId(req.user.id);
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        if (report.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const updatedReport = await Report.update(req.params.id, req.body);
        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        if (report.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        await Report.deleteById(req.params.id);
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateReportStatus = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin role required' });
    }
    const { status } = req.body;
    if (!status || !['open', 'in_progress', 'closed'].includes(status)) {
        return res.status(400).json({ error: "Status must be 'open', 'in_progress', or 'closed'" });
    }
    try {
        const updatedReport = await Report.updateStatus(req.params.id, status);
        if(!updatedReport) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getReportsByUserId = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin role required' });
    }

    try {
        const { userId } = req.params;
        const reports = await Report.findAllByUserId(userId);
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};