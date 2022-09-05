const express = require('express')
//keep track of environment variables
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

//initialize express
const app = express()

app.get('/api/goals', (req, res) => {
    res.status(200).json({message: 'Get Goals!'})
})

app.listen(port, () => 
console.log(`Server started on ${port}`))