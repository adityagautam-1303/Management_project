import jwt from "jsonwebtoken";
import ErrorHandler from "./ErrorMiddlewares.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { User } from "../models/userSchema.js";

export const isAdminAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return next (new ErrorHandler("Admin Not Authenticated!",400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user= await User.findById(decoded.id);
    if(req.user.role!=="Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorised for this resourse`,403));
    }
    next();
});

export const isPatientAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next (new ErrorHandler("User Not Authenticated!",400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user= await User.findById(decoded.id);
    if(req.user.role!=="Patient"){
        return next(new ErrorHandler(`${req.user.role} not authorised for this resourse`,403));
    }
    next();
})