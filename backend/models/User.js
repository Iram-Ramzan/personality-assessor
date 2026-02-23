const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },           
  googleId: { type: String, sparse: true }, 
  role: { type: String, enum: ["user", "admin"], default: "user" }
});
// Custom validation: require EITHER password OR googleId
userSchema.pre('save', function(next) {
  if (!this.password && !this.googleId) {
    return next(new Error('Either password or googleId is required'));
  }
  next();
});
module.exports = mongoose.model("User", userSchema);
