import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/app.config";
import connectDB from "./database/database";
import { errorHandler } from "./middlewares/errorHandler";

//routes
import authRoutes from "./modules/auth/auth.routes";
import passport from "./middlewares/passport";
import sessionRoutes from "./modules/session/session.routes";
import { authenticateJWT } from "./common/strategies/jwt.strategy";
import mfaRoutes from "./modules/mfa/mfa.routes";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  }) // for parsing application/x-www-form-urlencoded
);

app.use(cookieParser()); // for parsing cookies
//initialize passport
app.use(passport.initialize());

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/mfa`, mfaRoutes);

//session routes
app.use(`${BASE_PATH}/session`, authenticateJWT, sessionRoutes);

//error handling
app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(
    `Server is running on http://localhost:${config.PORT}${BASE_PATH}`
  );
  await connectDB();
});
