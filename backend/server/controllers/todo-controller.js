import * as todoService from '../services/todo-services';

/** Common function to catch error responses during http request 
 *  @returns callback with error message and status code.*/
const renderErrorResponse = (response) => {
    const callback = (error) => {
        if(error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return callback;
};

/** 
 * Function to GET the list to todo items from database.
 * @returns Promise reponse with status code and json result.*/
export const list = (request, response) => {
    const promise = todoService.search({});
    promise.then((todos) => {
        response.status(200);
        response.json(todos);
    })
    .catch(renderErrorResponse(response));
};

/**Function to POST new todo item to database.
 * @returns todo item if request is successful and error request
 *          is not successful.
 */
export const save = (request, response) => {
    const newTodo = Object.assign({}, request.body);
    const resolve = (todo) => {
        response.status(200);
        response.json(todo);
    };
    todoService.save(newTodo)
        .then(resolve)
        .catch(renderErrorResponse(response));

};

/**Function to GET todo item of given id.
 * @returns Todo item corresponding to given ID if request is 
 *          successfull else returns error message.
 */
export const get = (request, response) => {
    const todoId = request.params.id;
    const resolve = (todo) => {
        response.status(200);
        response.json(todo);
    };
    todoService.find(todoId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**Function to  update(PUT) todo item of given id.
 * @returns Todo item corresponding to given ID if request is 
 *          successfull else returns error message.
*/
export const update = (request, response) => {
    const todoId = request.params.id;
    const newTodo = Object.assign({}, request.body);
    const resolve = (todo) => {
        response.status(200);
        response.json(todo);
    };
    todoService.update(todoId, newTodo)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/** Function to DELETE todo item of given id.
 * @returns Successfully deleted message if request is 
 *          successfull else returns error message.
 */
export const remove = (request, response) => {
    const todoId = request.params.id;
    const resolve = () => {
        response.status(200);
        response.json({
            message: "Successfully Deleted!!!"
        });
    };
    todoService.remove(todoId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};