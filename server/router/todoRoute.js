const express = require('express')
const router = express.Router()

const todo = require('../controllers/todoControllers')

router.route('/getData').get(todo.getData)
router.route('/addTask').post(todo.addTask)
router.route('/complete').put(todo.completeTask)
router.route('/updateTask').put(todo.updateTask)
router.route('/deleteTask/:id').delete(todo.deleteTask)

module.exports = router