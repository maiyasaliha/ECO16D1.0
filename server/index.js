const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const http = require('http');
// const socketIo = require('socket.io');
const authRouter = require('./routes/authRoutes');
const principaleRouter = require('./routes/principaleRoutes');
const ecoRouter = require('./routes/ecoRoutes');
const colisRouter = require('./routes/colisRoutes');

const app = express();
// const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// const io = socketIo(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST']
//     }
// });

// app.get('/', (req, res) => {
//     res.send('Socket.IO server is running.');
// });

app.use('/', authRouter);
app.use('/', principaleRouter);
app.use('/', ecoRouter);
app.use('/', colisRouter);

mongoose.connect('mongodb://localhost:27017/ECO16D')
.then(() => console.log('Connected to MongoDB!'))
.catch((error) => console.error('Failed to connect to MongoDB:', error));

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// io.on('connection', (socket) => {
//     console.log('A user connected');
    
//     socket.on('cellUpdate', (update) => {
//         console.log('Cell update received:', update);
//         socket.broadcast.emit('cellUpdate', update);
//     });

//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
