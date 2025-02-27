import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorMiddlewares.js";
import{Message} from "../models/messageSchema.js"

export const sendMessage =catchAsyncErrors(async(req,res,next)=>{
    const {firstName, lastName, email, phone, message} =req.body;
    if(!firstName||!lastName||!email||!phone||!message){
        return next(new ErrorHandler("Please Fill Full Form!",400)  );
        
    }
    await Message.create({firstName, lastName, email, phone, message});
        res.status(200).json({
            success:true,
            message:"Message Sent Successfully",
        });
});

export const getMessages = catchAsyncErrors(async(req,res,next)=>{
    const message= await Message.find();
    res.status(200).json({
        success:true,
        message,
    });
})