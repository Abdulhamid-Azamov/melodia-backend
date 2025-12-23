import express from "express";
import musics from "../controllers/music.controller.js";
import { validator } from "../middlewares/validation-handle.js";
import musicValidation from "../validation/music.validation.js";

const router = express.Router();

router
    .post("/", validator(musicValidation.create), musics.create)
    .get("/", musics.getAll)
    .get("/:id", musics.get)
    .patch("/:id", validator(musicValidation.update), musics.update)
    .delete('/:id', musics.remove)


export default router;