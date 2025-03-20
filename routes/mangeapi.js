import { Router } from "express";
import db from '../db.js';
const router = Router();

/**
 * Get all bookings
 * @route GET /booking
 */
router.get('/booking', (req, res) => {
    try {
        const bookings = db.prepare(`SELECT * FROM Reservations`).all();
        // Enhance bookings with customer names and room numbers
        for (const booking of bookings) {
            const customer = db.prepare('SELECT first_name, last_name FROM Customers WHERE customer_id = ?').get(booking.customer_id);
            const room = db.prepare(`SELECT room_number FROM Rooms WHERE room_id = ?`).get(booking.room_id);
            
            if (customer && room) {
                booking.customerName = `${customer.first_name} ${customer.last_name}`;
                booking.room_number = room.room_number; // Changed from roomnum to room_number
            } else {
                booking.customerName = 'Unknown Customer';
                booking.room_number = 'Unknown Room';
            }
        }
        return res.status(200).json({ 
            success: true, 
            data: bookings 
        });
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve bookings',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});



router.get('/rooms',(req,res) => {
    try{
        const rooms = db.prepare(`SELECT * FROM Rooms`).all();
        return res.status(200).json({
            success: true,
            data: rooms
        });
    }
    catch{
        console.error('Error fetching rooms:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve rooms',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});


router.get('/customers',(req,res) => {
    try{
        const people = db.prepare(`SELECT * FROM Customers`).all();
        return res.status(200).json({
            success: true,
            data: people
        });
    }
    catch{
        console.error('Error fetching rooms:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve rooms',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

export default router;