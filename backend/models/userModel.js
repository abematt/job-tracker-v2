const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static Method To Signup User
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new Error("All Fields Are Required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new Error("Email already in use");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one symbol."
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPassword });

  return user;
};

//Static Method to Login User 
userSchema.statics.login = async function(email,password){
  if(!email || !password){
    throw new Error('All Fields Are Required')
  }

  if(!validator.isEmail(email)){
    throw new Error('Invalid Email')
  }

  const user = await this.findOne({email})

  if(!user){
    throw new Error('Email not found')
  }

  const isMatch = await bcrypt.compare(password,user.password)

  if(!isMatch){
    throw new Error('Invalid Password')
  }

  return user
}

module.exports = mongoose.model("User", userSchema);
