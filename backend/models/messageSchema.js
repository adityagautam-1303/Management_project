import mongoose from "mongoose";
import validator from "validator";

const messageSchema= new mongoose.Schema({
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
    message:{
        type:String,
        required: true,
        minLength: [10,"Message Must Contain Atleast 10 Characters"]
    }
})

export const Message= mongoose.model("Message",messageSchema);