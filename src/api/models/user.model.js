const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    groups: [{ type: Schema.ObjectId, ref: "groups",require: false }],
    secretSanta: [{ type: String, ref: "user" }],
    role: { type: String, default: "user", enum: ["admin", "user"] },

}, {
    collection: "user"
});


const User = mongoose.model("user", userSchema)
module.exports = User;