const mongoose  = require("mongoose");
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        maxLength: 20, 
        required: true,
    },
    lastName:{
        type: String,
        maxLength: 20, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true // `email` must be unique
    },
    pwd: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: ()=>Date.now(),
    },
    updatedAt: {
        type: Date,
        default: ()=>Date.now(),
    },
    description: {
        type: String
    }

})

userSchema.pre('save', async function(next) {

    const user = this;
    if (!user.isModified('pwd')) return next();
  
    try {
    const salt = await bcrypt.genSalt(10);
    console.log(salt)
    console.log(user.pwd)

    const hash = await bcrypt.hash(user.pwd, salt);
    user.pwd = hash;

    // console.log('pasward encryption Done')

    next();

    } catch (err) {
        return next(err);
    }
  });


  userSchema.methods.validatePassword  = async function validatePassword(data) {
    let c =  await bcrypt.compare(data, this.pwd)
    console.log(c)

    return await bcrypt.compare(data, this.pwd);};

module.exports= mongoose.model("User",userSchema);