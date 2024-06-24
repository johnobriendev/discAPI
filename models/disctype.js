const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DisctypeSchema = new Schema({
  name: {type: String, required: true, enum: ["Distance Driver", "Fairway Driver", "Midrange", "Putter"]}
});

DisctypeSchema.virtual("url").get(function () {
  return `/catalog/disctype/${this._id}`;
})

module.exports = mongoose.model("Disctype", DisctypeSchema);