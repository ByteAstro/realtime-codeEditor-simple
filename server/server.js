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
        methods: ["GET", "POST"],
    }
});

// socket.io listener ------------------------------
const socketListen = require('./socketComm.js')
socketListen(io);

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