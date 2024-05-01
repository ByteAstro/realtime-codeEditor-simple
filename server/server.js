const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http')
const { Server } = require('socket.io')
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

// socket.io listener ------------------------------
const socketCommunication1 = require('./socketComm.js')
socketCommunication1(io);

// app running check ---------------------------------
app.get('/', (req, res) => {
    res.send('Life is good, When we dont care and just code.');
})

// Server listen code ------------------------------
const PORT = process.env.PORT || 4500;
server.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});