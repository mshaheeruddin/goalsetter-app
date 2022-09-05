//this expression is equivalent to import statement
const express = require('express')
const router = express.Router()
//{ Function to Call when We GET }
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controllers/goalController')

//callback functions -> exported to goalController.js File

/*
router.get('/', getGoals)
router.post('/', setGoals)

merged into this one function!

*/
router.route('/').get(getGoals).post(setGoals)

/*
router.put('/:id', updateGoals)
router.delete('/:id', deleteGoals)

merged into this one function!

*/

router.route('/:id').put(updateGoals).delete(deleteGoals)


module.exports = router 