import express from 'express';
import * as todoController from '../controllers/todo-controller';

const router = express.Router();

// urls for TODO resource
router.route('/todos')
    .get(todoController.list) // To GET the list to all todo items.
    .post(todoController.save); // To POST new todo item.

router.route('/todos/:id')
    .get(todoController.get) // GET the todo item with given id.
    .put(todoController.update) // UPDATE todo item with given id.
    .delete(todoController.remove); // DELETE todo item of given id. 


export default router;
