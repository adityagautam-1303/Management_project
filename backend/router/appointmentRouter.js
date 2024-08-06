import express from "express";
import { deleteAppointment, getAppointments, pAppointment, updateAppointments } from "../controller/appointmentCont.js";
import {isPatientAuthenticated, isAdminAuthenticated} from "../Middlewares/auth.js"
const router = express.Router();

router.post("/post", isPatientAuthenticated, pAppointment);
router.get("/getall",isAdminAuthenticated,getAppointments);
router.put("/update/:id",isAdminAuthenticated,updateAppointments);
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment);
export default router;