const express = require('express');
const router = express.Router();
const { Vehicle, Booking } = require('../model/schema');

// Get a vehicle by ID
router.get('/veh/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).send('Vehicle not found');
        }
        res.send(vehicle);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Get vehicles by number of wheels
router.get('/veh/wheels/:wheels', async (req, res) => {
    const { wheels } = req.params;

    try {
        const vehicles = await Vehicle.findAll({
            where: {
              wheels: parseInt(wheels)
            }
          });
          
        res.json(vehicles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get vehicles by type
router.get('/veh/types/:types', async (req, res) => {
    const { types } = req.params;
    try {
        const vehicleTypes = await Vehicle.findAll({
            where: {
              type: types
            }
          });
          
        res.json(vehicleTypes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Create a booking
router.post('/bookings', async (req, res) => {
    try {
        const { firstName, lastName, vehicleModel, vehicleType, wheels, startDate, endDate } = req.body;
        // console.log("Heeloo", firstName, lastName, vehicleModel, vehicleType, wheels, startDate, endDate)
        const userPresent = await Booking.findOne({
            where: {
              firstName: firstName,
              lastName: lastName,
              vehicleModel: vehicleModel,
              startDate: startDate
            }
          });
        console.log(userPresent)
        if(userPresent?.firstName && userPresent?.lastName && userPresent?.vehicleModel && userPresent?.startDate){
            res.json({ message: "User already booked this vehicle" });
        }

        else{
            const booking = new Booking({
                firstName,
                lastName,
                vehicleModel,
                vehicleType,
                wheels,
                startDate,
                endDate
            });
            await booking.save();
            res.json({ message: 'Booking created successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.send(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.delete('/bookings/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findByPk(id);

        if (!booking) {
            return res.status(404).send('Booking not found');
        }

        await booking.destroy();
        res.send('Booking deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});


module.exports = router;
