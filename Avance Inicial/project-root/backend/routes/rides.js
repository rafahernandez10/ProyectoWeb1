const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// Crear un nuevo ride
router.post('/', async (req, res) => {
    const ride = new Ride(req.body);
    try {
        const savedRide = await ride.save();
        res.status(201).json(savedRide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todos los rides
router.get('/', async (req, res) => {
    try {
        const rides = await Ride.find();
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un ride por ID
router.get('/:id', async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) return res.status(404).json({ message: 'Ride not found' });
        res.json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un ride por ID
router.put('/:id', async (req, res) => {
    try {
        const updatedRide = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRide) return res.status(404).json({ message: 'Ride not found' });
        res.json(updatedRide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un ride por ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedRide = await Ride.findByIdAndDelete(req.params.id);
        if (!deletedRide) return res.status(404).json({ message: 'Ride not found' });
        res.json({ message: 'Ride deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
