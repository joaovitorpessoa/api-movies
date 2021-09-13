import swaggerUi from "swagger-ui-express";
import cors from "cors";
import swaggerFile from "./swagger.json";
import "reflect-metadata";
import createConnection from "./database";
import express, { json } from "express";
import { routes } from "./routes";

createConnection();
const app = express();

app.use(cors());
app.use(json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

export { app };
