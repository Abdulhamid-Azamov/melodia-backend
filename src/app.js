import express from "express";
import cookieParser from "cookie-parser"
import { envConfig } from './configs/index.js'
import connectDB from "./configs/db.js";
import indexRoutes from "./routes/index.route.js";
import { errorHandle } from "./middlewares/error-handle.js";
import { ApiError } from "./utils/custom-error.js";
import { createSuperAdmin } from './helpers/create-superadmin.js'

const app = express();
const PORT = envConfig.PORT || 9000;

app.use(express.json());
app.use(cookieParser())

await connectDB();
await createSuperAdmin();

app.use("/api", indexRoutes);

app.all(/(.*)/, (_req, _res, next) => {
    next(new ApiError('URL not found', 404));
});

app.use(errorHandle)

app.listen(PORT, () => console.log(`Server running on ${PORT} port`));