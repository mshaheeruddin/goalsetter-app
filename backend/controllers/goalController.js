//we could have used try catch for asyn - but we can use express async handler by downloading it through npm
const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModel')
// @desc    Get Goals
// @route   GET /api/goals
// @access  Private

//Using async? -> When we use mongoose in each of these func to interact with DB we get a promise!
const getGoals = asyncHandler(async (req,res) => {
   const goals = await Goal.find({ user: req.user.id })

   res.status(200).json(goals) 
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
    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id
    })


    res.status(200).json(goal)
 })

// @desc   Update Goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoals = asyncHandler(async (req,res) => {
   const goal = await Goal.findById(req.params.id)

    if (!goal) {
      res.status(400)
      throw new Error('Goal not Found')
    }

    //Get User before finding and updating User
    const user = await User.findById(req.user.id)
    
    //Check for User
    if (!user) {
        res.status(401)
        throw new Error('User Not Found')
    }
    //Now, we dont want users updating each others goals
    //Check for goals and goals must have user field on it 
    //which is object id and turn it to string before checking it
     
    //In Short: Make sure the logged in user match the goal user
    if(goal.user.toString() !== user.id) {
         res.status(401)
         throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updatedGoal)
 })

// @desc    Delete Goals
// @route   DELETE /api/g oals/:id
// @access  Private
const deleteGoals = asyncHandler(async (req,res) => {
   const goal = await Goal.findById(req.params.id)

   if (!goal) {
     res.status(400)
     throw new Error('Goal not Found')
   }
//Get User before finding and updating User
const user = await User.findById(req.user.id)
    
//Check for User
if (!user) {
    res.status(401)
    throw new Error('User Not Found')
}
//Now, we dont want users deleting each others goals
//Check for goals and goals must have user field on it 
//which is object id and turn it to string before checking it
 
//In Short: Make sure the logged in user match the goal user
if(goal.user.toString() !== user.id) {
     res.status(401)
     throw new Error('User not authorized')
}
  await goal.remove()


    res.status(200).json({ id: req.params.id })
 })



module.exports = {
   getGoals, 
   setGoals,
   updateGoals,
   deleteGoals
}