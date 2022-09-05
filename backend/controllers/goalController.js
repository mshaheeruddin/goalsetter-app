// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = (req,res) => {
   res.status(200).json({message: 'Get Goals'}) 
}

// @desc    Set Goals
// @route   POST /api/goals
// @access  Private
const setGoals = (req,res) => {
    //console.log(req.body) is undefined initially
    //to make req.body work, we have to create a middleware at server.js
    if (!req.body.text) {
          res.status(400).json({message: 'Please add a text field'})
    }
    res.status(200).json({message: 'Set Goals!'})
 }

// @desc   Update Goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoals = (req,res) => {
    res.status(200).json({message: `Update Goals ${req.params.id}`})
 }

// @desc    Delete Goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoals = (req,res) => {
    res.status(200).json({message: `Delete Goals ${req.params.id}`})
 }



module.exports = {
   getGoals, 
   setGoals,
   updateGoals,
   deleteGoals
}