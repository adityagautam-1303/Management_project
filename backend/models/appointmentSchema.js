import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema= new mongoose.Schema({
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
        minLength: [13,"Aadhar Must Contain Exact 13 Characters"],
        maxLength: [13,"Aadhar Must Contain Exact 13 Characters"],
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
    appointment_date:{
        type: String,
        required:true,

    },
    doctor:{
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
    },
    hasVisited:{
        type:Boolean,
        default: false,
    },
    doctorId:{
        type:String,
        required:true,
    },
    patientId:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending", "Accepted", "Rejected"],
        default:"Pending",
    },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);