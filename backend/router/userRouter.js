import express from "express";
import { adminlogout, addNewAdmin, getAllDoctors, getUsers, login, patientRegister, userlogout, addNewDoctor } from "../controller/userController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../Middlewares/auth.js"
const router = express.Router();

router.post("/patient/register",patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUsers);
router.get("/patient/me", isPatientAuthenticated, getUsers);
router.get("/admin/logout", isAdminAuthenticated, adminlogout);
router.get("/patient/logout", isPatientAuthenticated, userlogout);
router.post("/doctor/addnew",isAdminAuthenticated, addNewDoctor);
export default router;