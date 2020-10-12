const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrganizationSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = Organizations = mongoose.model(
  "organization",
  OrganizationSchema
);
