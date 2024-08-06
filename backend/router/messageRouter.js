import express from "express";
import { getMessages, sendMessage } from "../controller/messageController.js";
import { isAdminAuthenticated } from "../Middlewares/auth.js"
const router = express.Router();

router.post("/send",sendMessage);
router.get("/getall", isAdminAuthenticated, getMessages);
export default router;