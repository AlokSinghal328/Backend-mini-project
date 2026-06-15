const express = require('express');
const cors = require('cors');
const messageRoute = require('./routes/message.route');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json({
    limit: '16kb',
}));

app.use(express.urlencoded({
    extended: true,
}));

app.use('/api/message', messageRoute);

module.exports = app;