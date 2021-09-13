import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { MoviesRepository } from "../repositories/MoviesRepository";

class MovieValidator {
  async create(request: Request, response: Response, next: NextFunction) {
    const { title, rating } = request.body;

    if (typeof title !== "string") {
      return response.status(400).json({ error: "Title must be a string!" });
    }

    if (typeof rating !== "number" && typeof rating !== undefined) {
      return response.status(400).json({ error: "Rating must be a number!" });
    }

    const moviesRepository = getCustomRepository(MoviesRepository);

    const movieAlreadyExists = await moviesRepository.findOne({ title });

    if (movieAlreadyExists) {
      return response.status(400).json({ error: "Movie already exists!" });
    }

    next();
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { oldTitle, newTitle, newRating } = request.body;

    const moviesRepository = getCustomRepository(MoviesRepository);

    if (typeof oldTitle !== "string") {
      return response.status(400).json({ error: "oldTitle must be a string!" });
    }

    if (typeof newTitle !== "string" && typeof newTitle !== undefined) {
      return response.status(400).json({ error: "newTitle must be a string!" });
    }

    if (typeof newRating !== "number" && typeof newRating !== undefined) {
      return response
        .status(400)
        .json({ error: "newRating must be a number!" });
    }

    const movieAlreadyExists = await moviesRepository.findOne({
      title: oldTitle,
    });

    if (!movieAlreadyExists) {
      return response.status(404).json({ error: "Movie not found!" });
    }

    next();
  }
}

export { MovieValidator };
