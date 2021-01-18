"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Todo Schema in mongoose database.
var TodoSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: "Title is required."
  },
  description: {
    type: String,
    required: "Description is required."
  },
  dueDate: {
    type: Date,
    "default": Date.now
  },
  dueTime: {
    type: Date,
    "default": Date.now
  },
  completed: {
    type: Boolean,
    "default": false
  }
}, {
  versionKey: false
});
TodoSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
TodoSchema.set('toJSON', {
  virtuals: true
});

var _default = _mongoose["default"].model('Todo', TodoSchema);

exports["default"] = _default;