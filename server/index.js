const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const principaleRouter = require('./routes/principaleRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', authRouter);
app.use('/', principaleRouter);

mongoose.connect('mongodb://localhost:27017/ECO16D', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
