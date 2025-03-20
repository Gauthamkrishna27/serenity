import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';
import bookapi from './routes/bookingendpoint.js';
import manageapi from './routes/mangeapi.js';
const app = express();



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'src','index.html'));
});

app.get('/book', (req, res) => {
  res.sendFile(path.join(__dirname,'src','booking.html'));
});


app.get('/manage', (req, res) => {
  res.sendFile(path.join(__dirname,'src','admin.html'));
});

app.use('/api/book',bookapi) 

app.use('/api/manage',manageapi)





app.listen(5000, () => {
  console.log('Server is running on port 3000');
});