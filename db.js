import Database from "better-sqlite3";
const db = new Database("serenity.db");

// Create tables if they don't exist
db.exec(`CREATE TABLE IF NOT EXISTS Customers (
    customer_id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    address TEXT
);`);

db.exec(`CREATE TABLE IF NOT EXISTS Rooms (
    room_id INTEGER PRIMARY KEY,
    room_number TEXT UNIQUE,
    room_type TEXT,
    capacity INTEGER,
    price_per_night REAL,
    status TEXT DEFAULT 'Available'
);`);

// Check if Rooms table is empty before inserting data
const roomCount = db.prepare('SELECT COUNT(*) as count FROM Rooms').get();
if (roomCount.count === 0) {
    const rooms = [
        { room_number: '101', room_type: 'Deluxe Suite', capacity: 2, price_per_night: 200 },
        { room_number: '102', room_type: 'Deluxe Suite', capacity: 2, price_per_night: 200 },
        { room_number: '103', room_type: 'Deluxe Suite', capacity: 2, price_per_night: 200 },
        { room_number: '201', room_type: 'Executive Room', capacity: 2, price_per_night: 150 },
        { room_number: '202', room_type: 'Executive Room', capacity: 2, price_per_night: 150 },
        { room_number: '203', room_type: 'Executive Room', capacity: 2, price_per_night: 150 },
        { room_number: '301', room_type: 'Presidential Suite', capacity: 4, price_per_night: 300 },
        { room_number: '302', room_type: 'Presidential Suite', capacity: 4, price_per_night: 300 },
        { room_number: '303', room_type: 'Presidential Suite', capacity: 4, price_per_night: 300 },
        { room_number: '304', room_type: 'Presidential Suite', capacity: 4, price_per_night: 300 }
    ];

    const insertRoom = db.prepare(`INSERT INTO Rooms (room_number, room_type, capacity, price_per_night, status) VALUES (?, ?, ?, ?, ?)`);
    for (const room of rooms) {
        insertRoom.run(room.room_number, room.room_type, room.capacity, room.price_per_night, room.status || 'Available');
    }
}

db.exec(`CREATE TABLE IF NOT EXISTS Reservations (
    reservation_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    room_id INTEGER,
    check_in_date TEXT,
    check_out_date TEXT,
    total_price REAL,
    status TEXT DEFAULT 'Confirmed',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id)
);`);

db.exec(`CREATE TABLE IF NOT EXISTS Payments (
    payment_id INTEGER PRIMARY KEY,
    reservation_id INTEGER,
    amount REAL,
    payment_date TEXT DEFAULT CURRENT_TIMESTAMP,
    payment_method TEXT,
    status TEXT DEFAULT 'Pending',
    FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id)
);`);

db.exec(`CREATE TABLE IF NOT EXISTS Staff (
    staff_id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    role TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    salary REAL
);`);

export default db;
