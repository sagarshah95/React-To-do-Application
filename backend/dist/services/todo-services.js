"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.update = exports.find = exports.save = exports.search = void 0;

var _todo = _interopRequireDefault(require("../models/todo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var search = function search(params) {
  var promise = _todo["default"].find(params).exec();

  return promise;
};

exports.search = search;

var save = function save(todo) {
  var newTodo = new _todo["default"](todo);
  var promise = newTodo.save();
  return promise;
};

exports.save = save;

var find = function find(id) {
  var promise = _todo["default"].findById(id).exec();

  return promise;
};

exports.find = find;

var update = function update(id, newValue) {
  newValue.lastModifiedDate = new Date();

  var promise = _todo["default"].findOneAndUpdate({
    _id: id
  }, newValue, {
    "new": true
  }).exec();

  return promise;
};

exports.update = update;

var remove = function remove(id) {
  var promise = _todo["default"].remove({
    _id: id
  });

  return promise;
};

exports.remove = remove;