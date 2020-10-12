const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LocationSchema = new Schema(
  {
    org_id: String,
    name: String,
    address: String,
    latitude: Number,
    longitude: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = Locations = mongoose.model("location", LocationSchema);
