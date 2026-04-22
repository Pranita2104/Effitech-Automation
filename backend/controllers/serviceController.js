const Service = require('../models/Service');

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createService = async (req, res) => {
    try {
        const newService = new Service(req.body);
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedService);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
