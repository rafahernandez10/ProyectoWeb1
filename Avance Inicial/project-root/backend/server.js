const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/ridesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rutas
const ridesRoutes = require('./routes/rides');
app.use('/api/rides', ridesRoutes);

// Puerto de servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
