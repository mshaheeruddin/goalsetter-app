const express = require('express')
//keep track of environment variables
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

//initialize express
const app = express()
//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => 
console.log(`Server started on ${port}`))