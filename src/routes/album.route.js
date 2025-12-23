import express from "express";
import albums from "../controllers/album.controller.js";
import { validator } from "../middlewares/validation-handle.js";
import albumValidation from "../validation/album.validation.js";

const router = express.Router();

router
  .post("/", validator(albumValidation.create), albums.create)
  .get("/", albums.getAll)
  .get("/:id", albums.get)
  .patch("/:id", validator(albumValidation.update), albums.update)
  .delete("/:id", albums.remove);

export default router;