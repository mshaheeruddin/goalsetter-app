const asyncHandler = require('express-async-handler')

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private

//Using async? -> When we use mongoose in each of these func to interact with DB we get a promise!
const getGoals = asyncHandler(async (req,res) => {
   res.status(200).json({message: 'Get Goals'}) 
})

// @desc    Set Goals
// @route   POST /api/goals
// @access  Private
const setGoals = asyncHandler(async (req,res) => {
    //console.log(req.body) is undefined initially
    //to make req.body work, we have to create a middleware at server.js
    if (!req.body.text) {
          //res.status(400).json({message: 'Please add a text field'})
          //prefer express error handler instead of .json
          res.status(400)
          throw new Error('Please add a text field')

    }
    res.status(200).json({message: 'Set Goals!'})
 })

// @desc   Update Goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoals = asyncHandler(async (req,res) => {
    res.status(200).json({message: `Update Goals ${req.params.id}`})
 })

// @desc    Delete Goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoals = asyncHandler(async (req,res) => {
    res.status(200).json({message: `Delete Goals ${req.params.id}`})
 })



module.exports = {
   getGoals, 
   setGoals,
   updateGoals,
   deleteGoals
}