import { Request, Response, NextFunction } from "express"; // Tipagem para os parâmetros de callback do express
import { getCustomRepository } from "typeorm"; // Função para lidar com repositórios (abstração de tabela) customizados
import { MoviesRepository } from "../repositories/MoviesRepository"; // Repositório da tabela "movies"

class MovieValidator {
  async create(request: Request, response: Response, next: NextFunction) {
    /**
     * Schema de input esperado:
     * {
     *  "title": string,
     *  "rating": number
     * }
     */

    const { title, rating } = request.body; // Desestruturação nos dados do JSON que está no corpo da requisição

    if (typeof title !== "string") {
      // Validação de tipo para title
      return response.status(400).json({ error: "Title must be a string!" });
    }

    if (typeof rating !== "number" && typeof rating !== undefined) {
      // Validação de tipo para rating
      return response.status(400).json({ error: "Rating must be a number!" });
    }

    const moviesRepository = getCustomRepository(MoviesRepository); // Cria o objeto que representa a abstração de tabela

    const movieAlreadyExists = await moviesRepository.findOne({ title }); // Busca uma entidade com o valor de "title" na coluna title

    if (movieAlreadyExists) {
      // Se foi encontrado alguma entidade, retorna com status code 400
      return response.status(400).json({ error: "Movie already exists!" });
    }

    next();
  }

  async update(request: Request, response: Response, next: NextFunction) {
    /**
     * Schema de input esperado:
     * {
     *  "oldTitle": string
     *  "newTitle": string,
     *  "newRating": number
     * }
     */

    const { oldTitle, newTitle, newRating } = request.body; // Desestruturação nos dados do JSON que está no corpo da requisição

    const moviesRepository = getCustomRepository(MoviesRepository); // Cria o objeto que representa a abstração de tabela

    if (typeof oldTitle !== "string") {
      // Validação de tipo para oldTitle
      return response.status(400).json({ error: "oldTitle must be a string!" });
    }

    if (typeof newTitle !== "string" && typeof newTitle !== undefined) {
      // Validação de tipo para newTitle
      return response.status(400).json({ error: "newTitle must be a string!" });
    }

    if (typeof newRating !== "number" && typeof newRating !== undefined) {
      // Validação de tipo para newRating
      return response
        .status(400)
        .json({ error: "newRating must be a number!" });
    }

    const movieAlreadyExists = await moviesRepository.findOne({
      // Busca pelo valor de oldTitle nas entidades
      title: oldTitle,
    });

    if (!movieAlreadyExists) {
      // Se não existir alguma entidade com o mesmo título, retorna com status code 404
      return response.status(404).json({ error: "Movie not found!" });
    }

    next();
  }
}

export { MovieValidator };
