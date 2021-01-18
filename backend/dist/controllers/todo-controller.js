"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.update = exports.get = exports.save = exports.list = void 0;

var todoService = _interopRequireWildcard(require("../services/todo-services"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** Common function to catch error responses during http request 
 *  @returns callback with error message and status code.*/
var renderErrorResponse = function renderErrorResponse(response) {
  var callback = function callback(error) {
    if (error) {
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


var list = function list(request, response) {
  var promise = todoService.search({});
  promise.then(function (todos) {
    response.status(200);
    response.json(todos);
  })["catch"](renderErrorResponse(response));
};
/**Function to POST new todo item to database.
 * @returns todo item if request is successful and error request
 *          is not successful.
 */


exports.list = list;

var save = function save(request, response) {
  var newTodo = Object.assign({}, request.body);

  var resolve = function resolve(todo) {
    response.status(200);
    response.json(todo);
  };

  todoService.save(newTodo).then(resolve)["catch"](renderErrorResponse(response));
};
/**Function to GET todo item of given id.
 * @returns Todo item corresponding to given ID if request is 
 *          successfull else returns error message.
 */


exports.save = save;

var get = function get(request, response) {
  var todoId = request.params.id;

  var resolve = function resolve(todo) {
    response.status(200);
    response.json(todo);
  };

  todoService.find(todoId).then(resolve)["catch"](renderErrorResponse(response));
};
/**Function to  update(PUT) todo item of given id.
 * @returns Todo item corresponding to given ID if request is 
 *          successfull else returns error message.
*/


exports.get = get;

var update = function update(request, response) {
  var todoId = request.params.id;
  var newTodo = Object.assign({}, request.body);

  var resolve = function resolve(todo) {
    response.status(200);
    response.json(todo);
  };

  todoService.update(todoId, newTodo).then(resolve)["catch"](renderErrorResponse(response));
};
/** Function to DELETE todo item of given id.
 * @returns Successfully deleted message if request is 
 *          successfull else returns error message.
 */


exports.update = update;

var remove = function remove(request, response) {
  var todoId = request.params.id;

  var resolve = function resolve() {
    response.status(200);
    response.json({
      message: "Successfully Deleted!!!"
    });
  };

  todoService.remove(todoId).then(resolve)["catch"](renderErrorResponse(response));
};

exports.remove = remove;