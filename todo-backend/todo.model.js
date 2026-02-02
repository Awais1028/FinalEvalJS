const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
  deletedAt: {
    type: String,
    required: true,
    default: "N/A",
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const TODO = mongoose.model("TODO", todoSchema);

module.exports = TODO;
