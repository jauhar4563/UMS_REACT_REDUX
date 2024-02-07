const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors')
const port = process.env.PORT || 3000;
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const app = express()

connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/goals/',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/admin',require('./routes/adminRoutes'))

app.use(errorHandler);

app.listen(port,()=>console.log(`server Started on port ${port}`)) 