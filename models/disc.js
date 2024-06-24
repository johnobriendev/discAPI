const mongoose = require("mongoose");
const manufacturer = require("./manufacturer")
const Schema = mongoose.Schema;

const DiscSchema = new Schema({
  name: {type: String, required : true},
  manufacturer: {type: Schema.Types.ObjectId, ref: "Manufacturer", required: true},
  disctype: {type: Schema.Types.ObjectId, ref: "Disctype", required: true},
  speed: {type: Number, required: true, minLength: 1, maxLength: 14},
  glide: {type: Number, required: true, minLength: 1, maxLength: 7},
  turn: {type: Number, required: true, minLength: -4, maxLength: 1},
  fade: {type: Number, required: true, minLength: 0, maxLength: 5},
});

DiscSchema.virtual("url").get(function () {
  return `/catalog/disc/${this._id}`;
})

module.exports = mongoose.model("Disc", DiscSchema);