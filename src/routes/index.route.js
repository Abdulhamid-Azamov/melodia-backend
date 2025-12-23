import express from "express";

import adminRouter from './admin.route.js';
import albumRouter from './album.route.js';
import musicRouter from './music.route.js';
import userRoute from "./user.route.js";

const router = express.Router();

router.use("/admin", adminRouter)
router.use("/album", albumRouter);
router.use("/musics", musicRouter);
router.use("/users", userRoute)


export default router;