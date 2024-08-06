import ErrorHandler from "../Middlewares/ErrorMiddlewares.js";
import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
export const patientRegister =catchAsyncErrors(async (req,res,next)=>{
    const {firstName, lastName, email, phone, password, gender, dob, nic, role}= req.body;
    if(!firstName||!lastName|| !email||!phone||!password||!gender||!dob||!nic||!role){
        return next(new ErrorHandler("Please fill the form full",400));
    }
    let user= await User.findOne({email})
        if(user){
            return next(new ErrorHandler("User already Exists",400));
        }
       user = await User.create({
            firstName, lastName, email, phone, password, gender, dob, nic, role
        });
        generateToken(user, "User Registered Successfully!", 200, res);
    }
);

export const login = catchAsyncErrors(async(req,res,next)=>{
  const {email, password, confirmPassword, role}=req.body;
  if(!email||!password||!confirmPassword||!role){
    return next (new ErrorHandler("Please Provide all details", 400));
  }
  if(password!==confirmPassword){
    return next (new ErrorHandler("Password and Confirm Password do not match", 400));
  }
  const user= await User.findOne({email})
  if(!user){
    return next(new ErrorHandler("Invaid Password or Email", 400));
  }
  const letpass=user.password;

  let isPasswordMatched;
  if(letpass===password) isPasswordMatched=true;
  if(!isPasswordMatched){
    return next(new ErrorHandler("Password do not match", 400));
  }
  if(role!== user.role){
    return next(new ErrorHandler("User with this role not found", 400));
  }
  generateToken(user, "User Loggedin Successfully!", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const {firstName, lastName, email, phone, password, gender, dob, nic, role}= req.body;
    if(!firstName||!lastName|| !email||!phone||!password||!gender||!dob||!nic||!role){
    return next (new ErrorHandler("Please Provide all details", 400));
  }
  const user =await User.findOne({email});
  console.log({user});
  const isRegistered = await User.findOne({email});
  if(isRegistered){
    return next (new ErrorHandler(`${user.role} with this email  already exists`, 400));
  }
  const admin = await User.create({
    firstName, 
    lastName, 
    email, 
    phone, 
    password, 
    gender, 
    dob, 
    nic, 
    role:"Admin",
  });
  res.status(200).json({
    status:true,
    message:"Admin created Successfully!",
  })
});

export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role:"Doctor"});
    res.status(200).json({
        status:true,
        doctors
    });
});

export const getUsers = catchAsyncErrors(async(req,res,next)=>{
    const users= req.user;
    res.status(200).json({
        status:true,
        users,
    });
});

export const adminlogout = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires: new Date(Date.now()),
    })
    .json({
        success:true,
        message:"Admin logged out Successfully!"
    })
});

export const userlogout = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires: new Date(Date.now()),
    })
    .json({
        success:true,
        message:"Patient logged out Successfully!"
    })
});

export const addNewDoctor = catchAsyncErrors(async(req,res,next)=>{
    if(!req.files||Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doctor Avatar Requires", 400));
    }
    const {avatar} = req.files;
    const allowedFormats =  ["image/png","image/jpeg", "image/webp" ];
    if(!allowedFormats.includes(avatar.mimetype)){
        return next(new ErrorHandler("File Format not Supporteed!", 400));
    }

    const {firstName, 
        lastName, 
        email, 
        phone, 
        password,  
        gender, 
        dob, 
        nic,
        doctorDepartment
     } = req.body;

     if(!firstName||!lastName|| !email||!phone||!password||!gender||!dob||!nic||!doctorDepartment){
        return next(new ErrorHandler("Please Provide full details!", 400));
     } 
     const ifregi = await User.findOne({email});
     if(ifregi){
        return next(new ErrorHandler(`${ifregi.role} already registered with this email`, 400));
     }
     const cloudinarResponse = await cloudinary.uploader.upload(avatar.tempFilePath);

     if(!cloudinarResponse||cloudinarResponse.error){
        console.error(
            "Cloudinary Error!",
            cloudinarResponse.error||"Unknown Cloudinary Error"
        );
     }
     const doctor = await User.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        password,  
        gender, 
        dob, 
        nic,
        doctorDepartment,
        role:"Doctor",
        docAvatar:{
            public_id:cloudinarResponse.public_id,
            url: cloudinarResponse.secure_url,
        },
     });
     res.status(200).json({
        success:true,
        message:"Doctor Added Successfully",
        doctor,
     })
})