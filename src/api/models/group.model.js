const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    name: { type: String, require: true },
    usersList: [{ type: String, require: false }],
    isPrivate: { type: Boolean, require: true, default: false },
    img: {type: String, require: false},
    password: { type: String, require: false },
    owner: { type: Schema.ObjectId, require: true, ref: "user" },
    quantity: { type: Number, require: true },
  },
  {
    collection: "groups",
  }
);

const Group = mongoose.model("group", groupSchema);
module.exports = Group;
