const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscinstanceSchema = new Schema({
  disc: {type: Schema.Types.ObjectId, ref: "Disc", required: true},
  plastic: {type: String, required: true, enum: ["DX", "Pro", "KC Pro", "JK Pro", "Champion", "Star", "GStar", "Halo Star", "C-Line"]},
  weight: {type: Number, required: true, minLength: 130, maxLength: 180},
  color: {type: String, required: true,},
  price: { type: Number, required: true }, 
  photo: { type: String },
  photoKey: { type: String }, //s3 object key
  published: { type: Boolean, default: false },

})

DiscinstanceSchema.virtual("url").get(function () {
  return `/catalog/discinstance/${this._id}`;
});

module.exports = mongoose.model("Discinstance", DiscinstanceSchema);