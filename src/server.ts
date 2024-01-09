import "dotenv/config";
import path from "path";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { dbConnection } from "./utils/db-connect.js";
import { authRouter } from "./modules/auth/router/auth-router.js";
import { usersRouter } from "./modules/user/router/user-router.js";
import { categoriesRouter } from "./modules/categories/router/categories-router.js";
import { skillsRouter } from "./modules/skills/router/skills-router.js";
import { worksRouter } from "./modules/work/router/work-router.js";
import { subCategoriesRouter } from "./modules/subcategories/router/subcategory.router.js";
import { reviewsRouter } from "./modules/reviews/router/reviews.router.js";
import { orderRouter } from "./modules/order/router/order.router.js";
import multer from "multer";

declare global {
  namespace Express {
    interface Request {
      user: Object;
    }
  }
}

// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

export const server = async (): Promise<void> => {
  try {
    const app: Application = express();
    app.use(express.json());

    await dbConnection();

    // Enable cors
    app.use(cors());

    // Routers
    app.use("/api", authRouter);
    app.use("/api", usersRouter);
    app.use("/api", categoriesRouter);
    app.use("/api", subCategoriesRouter);
    app.use("/api", skillsRouter);
    app.use("/api", worksRouter);
    app.use("/api", reviewsRouter);
    app.use("/api", orderRouter);

    // Error handling

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      res.status(error.code).json({ error: error.message });
      next();
    });

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof multer.MulterError) {
        res.status(400).json({ error: "File size limit exceeded" });
      } else {
        next(error);
      }
    });

    app.use(express.static(path.join(path.resolve(), "uploads")));

    // App port
    app.listen(process.env.APP_PORT, () =>
      console.log("server is running on port: " + process.env.APP_PORT)
    );
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
};

server();
