const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookineParser = require('cookie-parser');
const userRoute = require('./router/userRoute');
const tourRoute = require('./router/tourRoute');
const authRoute = require('./router/authRoute');
const reviewsRoute = require('./router/reviewsRoute')
const bookingRoute = require('./router/booking')

const app = express();

//connect to database
mongoose.connect(process.env.DATABASE)
.then(res=>{
    console.log('Database connected')
})
.catch(err=>{
    console.log(err)
})

//middleware
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))
app.use(cookineParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//routes
app.use('/api/users',userRoute);
app.use('/api/tours',tourRoute);
app.use('/api/auth',authRoute);
app.use('/api/review',reviewsRoute)
app.use('/api/booking',bookingRoute)







app.listen(process.env.PORT,()=>console.log('The server starts'))

