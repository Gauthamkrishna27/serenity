import { Router } from "express";
import db from '../db.js';
const bookapi = Router();

bookapi
.post('/', (req, res) => {
    try{
      const {
        'first-name': firstName,
        'last-name': lastName,
        email,
        phone,
        address,
        'room-type': roomType,
        'check-in': checkIn,
        'check-out': checkOut
    } = req.body;
  
    let customer = db.prepare(`SELECT * FROM Customers WHERE email = ?`).get(email);
    console.log("Customer found:", customer);
    if (!customer){
      const insertCustomer = db.prepare(`INSERT INTO Customers (first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?)`);
      const result = insertCustomer.run(firstName, lastName, email, phone, address);
      customer = db.prepare(`SELECT * FROM Customers WHERE customer_id = ?`).get(result.lastInsertRowid);
      console.log("Customer created:", customer);
    }
    
    const room = db.prepare(`SELECT * FROM Rooms WHERE room_type = ? AND status = 'Available' LIMIT 1`).get(roomType);
    if (!room){
      res.status(410).json({ error: "No available roos" });
      return;
    }
    const insertReservation = db.prepare(`INSERT INTO Reservations (customer_id, room_id, check_in_date, check_out_date, total_price) VALUES (?, ?, ?, ?, ?)`);
    const totalPrice = room.price_per_night * ((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const reservationResult = insertReservation.run(customer.customer_id, room.room_id, checkIn, checkOut, totalPrice);
  
    db.prepare(`UPDATE Rooms SET status = 'Booked' WHERE room_id = ?`).run(room.room_id);
  
    res.status(201).json({ message: "Booking successful", reservationId: reservationResult.lastInsertRowid });
   
    }
    catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ error: "Failed to process booking" });
  }
  
  });
  



export default bookapi