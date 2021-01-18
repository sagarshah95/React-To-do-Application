import TodoRouter from './todo-route';

// Gets all the request urls from TodoRouter
export default (app) => {
  app.use('/', TodoRouter);
};