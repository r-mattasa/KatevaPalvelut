import express from "express";
import { addServiceData, getServiceData, getServicesDataById } from "../controllers/services.controller";

const router = express.Router();

router.post("/", addServiceData);
router.get("/", getServiceData);
router.get("/:id", getServicesDataById);
export default router;
