import { Router } from "express";
import { MovieController } from "./controllers/MovieController";
import { MovieValidator } from "./validators/MovieValidator";

const routes = Router();

const movieValidator = new MovieValidator();

const movieController = new MovieController();

routes.get("/movies", movieController.list);

routes.post("/movies", movieValidator.create, movieController.create);

routes.put("/movies", movieValidator.update, movieController.update);

routes.delete("/movies", movieController.delete);

routes.get("/unrated", movieController.listUnrated);

export { routes };
