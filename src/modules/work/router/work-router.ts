import { Router } from "express";
import { upload } from "../../../utils/multer";
import authMiddle from "../../auth/middlewares/auth-middle";
import workController from "../controller/work-controller.js";

export const worksRouter: Router = Router();

worksRouter.get("/works/:id", workController.getWork);
worksRouter.get("/bestworks", workController.getBestWorks);
worksRouter.get("/works/:title", workController.getWorksByTitle);
worksRouter.get("/works/by_sum", workController.getWorkBySum);

worksRouter.post(
  "/works/:id",
  // authMiddle.checkToken,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "files", maxCount: 10 },
  ]),
  workController.createWork
);

worksRouter.patch("/works/:id", workController.upDateOfferCount);
worksRouter.put("/works/:id", authMiddle.checkToken, workController.updateWork);
