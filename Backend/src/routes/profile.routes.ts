import express from "express";
import { createProfile, getProfile } from "../controllers/profile.controller";
import { Request, Response } from "express";

const router = express.Router();


router.post("/", async (req: Request, res: Response) => {
  const profile = req.body;
  const createdProfile = await createProfile(profile);
  res.send(createdProfile);
});

// router.post("/", createProfile);
router.get("/", async (req: Request, res: Response) => {
  const profiles = await getProfile();
  if (profiles === null) {
    res.status(404).send({ error: "profile not found" });
    return;
  }
  res.send(profiles);
});
// router.get("/", getProfile);

export default router;
