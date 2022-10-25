//this expression is equivalent to import statement
const express = require('express')
const router = express.Router()
//{ Function to Call when We GET }
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controllers/goalController')

const {protect} = require('../middleware/authMiddleware')

//callback functions -> exported to goalController.js File

/*
router.get('/', getGoals)
router.post('/', setGoals)

merged into this one function!

*/
router.route('/').get(protect, getGoals).post(protect,setGoals)

/*
router.put('/:id', updateGoals)
router.delete('/:id', deleteGoals)

merged into this one function!

*/

router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals)


module.exports = router 