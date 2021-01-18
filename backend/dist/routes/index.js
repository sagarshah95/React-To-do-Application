"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _todoRoute = _interopRequireDefault(require("./todo-route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Gets all the request urls from TodoRouter
var _default = function _default(app) {
  app.use('/', _todoRoute["default"]);
};

exports["default"] = _default;