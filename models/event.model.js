const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema(
  {
    org_id: String,
    name: String,
    date: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = Events = mongoose.model("event", EventSchema);
