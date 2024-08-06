import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength: [3,"FirstName Must Contain Atleast 3 Characters"]
    },
    lastName:{
        type:String,
        required: true,
        minLength: [3,"LastName Must Contain Atleast 3 Characters"]
    },
    email:{
        type:String,
        required: true,
        validate: [validator.isEmail,"Please provide a Valid Email"],
    },
    phone:{
        type:String,
        required: true,
        minLength: [11,"LastName Must Contain Exact 11 Characters"],
        maxLength: [11,"LastName Must Contain Exact 11 Characters"],
    },
    nic:{
        type:String,
        required: true,
        minLength: [13,"NIC Must Contain Exact 13 Characters"],
        maxLength: [13,"NIC Must Contain Exact 11 Characters"],
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"]
    },
    gender:{
        type: String,
        required:true,
        enum:["Male","Female","Other"],
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"minlenght is 8 "],
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"],
    }, 
    doctorDepartment:{
        type:String,
    },
    docAvatar:{
        public_id:String,
        url:String,
    },
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    });
}

export const User= mongoose.model("User",userSchema);