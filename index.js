const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const routes = require('./routes/index');


//Middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())


//Routes
app.use('/api', routes)


//Database
require('./utils/connectDB')


//Server Listening
app.listen(3000, () => {
    console.log("The server is up and running in port 3000")
})