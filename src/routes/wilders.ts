import express from "express";
import { wilderController } from "../controllers/Wilder";

const router = express.Router();

router.post("/", wilderController.create);
router.get("/", wilderController.find);
router.get("/:id", wilderController.findOne);
router.put("/:id", wilderController.update);
router.delete(":id", wilderController.delete);

export { router as wilderRouter };
