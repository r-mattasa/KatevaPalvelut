import express, { Request, Response }  from "express";
import { addSubServicesData, getSubServicesData, getSubServicesDataById } from "../controllers/subservices.controller";

const router = express.Router();

router.post("/", addSubServicesData);
router.get("/", getSubServicesData);
router.get("/:id", getSubServicesDataById);

/* app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Welcome to Kätevä Palvelut!");
}); */
/* router.get("/", (req: Request, res: Response) => {
  res.send("Hello, Welcome to Kätevä Palvelut!");
}); */
export default router;