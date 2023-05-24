 
const mongoose = require('mongoose');
const {isEmail} = require('validator');
 
const bcrypt = require('bcrypt');




 
const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    trim: true,
    unique:true,
    minlength:3,
    maxlength:55,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  },
  adress:{
    type : String
  },
  picture : {
    type : String, 
    default: "./uploads/profil/ramdom-user.png"
  },
  orders: {
    type : [String]
  }, 
},
{
  timestamps : true,
}
);
//Joue la fonction avant de save dans la BD 
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Add a static method to the userSchema for login functionality
userSchema.statics.login = async function(email, password) {
  // Find the user by email
  const user = await this.findOne({ email });
  if (user) {
    // Compare the provided password with the stored hashed password
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
};





const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;