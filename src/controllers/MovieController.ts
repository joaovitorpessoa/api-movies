import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { MoviesRepository } from "../repositories/MoviesRepository";

class MovieController {
  async create(request: Request, response: Response) {
    const { title, rating } = request.body;

    const moviesRepository = getCustomRepository(MoviesRepository);

    try {
      const movie = moviesRepository.create({ title, rating });

      await moviesRepository.save(movie);

      return response.status(201).send();
    } catch (error) {
      console.error(error);

      return response.status(500).send();
    }
  }

  async list(request: Request, response: Response) {
    const moviesRepository = getCustomRepository(MoviesRepository);

    try {
      const listOfMovies = await moviesRepository.find();

      return response.status(200).json(listOfMovies);
    } catch (error) {
      console.error(error);

      return response.status(500).send();
    }
  }

  async delete(request: Request, response: Response) {
    const { title } = request.body;

    const moviesRepository = getCustomRepository(MoviesRepository);

    try {
      const movie = await moviesRepository.find({
        where: { title },
      });

      if (!movie) {
        return response.status(404).json({ error: "Movie not found!" });
      }

      await moviesRepository.remove(movie);

      return response.status(200).send();
    } catch (error) {
      console.log(error);

      return response.status(500).send();
    }
  }

  async update(request: Request, response: Response) {
    const { oldTitle, newTitle, newRating } = request.body;

    const moviesRepository = getCustomRepository(MoviesRepository);

    try {
      const movieUpdate = await moviesRepository.findOne({
        where: { title: oldTitle },
      });

      if (newTitle) {
        movieUpdate.title = newTitle;
      }

      if (newRating) {
        movieUpdate.rating = newRating;
      }

      moviesRepository.save(movieUpdate);

      return response.status(200).json();
    } catch (error) {
      console.error(error);

      return response.status(500).send();
    }
  }

  async listUnrated(request: Request, response: Response) {
    const { random } = request.query;

    const moviesRepository = getCustomRepository(MoviesRepository);

    const randomNumberBetweenTwoValues = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min) + min);
    };

    try {
      const moviesUnrated = await moviesRepository.find({
        where: { rating: -1 },
      });

      if (random) {
        const randomIndexArray = randomNumberBetweenTwoValues(
          0,
          moviesUnrated.length - 1
        );

        return response.status(200).json([moviesUnrated[randomIndexArray]]);
      }

      return response.status(200).json(moviesUnrated);
    } catch (error) {
      console.error(error);

      response.status(500).send();
    }
  }
}

export { MovieController };
