const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  id: { type: String, required: true } // not sure about this one
});

module.exports = mongoose.model("Sequence", sequenceSchema);