import { Request, Response } from "express"; // Tipagem para os parâmetros de callback do express
import { getCustomRepository } from "typeorm"; // Função para lidar com repositórios (abstração de tabela) customizados
import { MoviesRepository } from "../repositories/MoviesRepository"; // Repositório da tabela "movies"

class MovieController {
  async create(request: Request, response: Response) {
    const { title, rating } = request.body; // Desestruturação dos itens "title" e "rating" do JSON que vem no body do request

    const moviesRepository = getCustomRepository(MoviesRepository); // Cria o objeto que representa a abstração de tabela

    // Tenta criar a entidade, se não conseguir deixa um log e retorna com status code 500
    try {
      const movie = moviesRepository.create({ title, rating }); // Cria uma entidade para o repositório de "movies"

      await moviesRepository.save(movie); // Salva a entidade no repositório

      return response.status(201).send();
    } catch (error) {
      console.error(error);

      return response.status(500).send();
    }
  }

  async list(request: Request, response: Response) {
    const moviesRepository = getCustomRepository(MoviesRepository); // Cria o objeto que representa a abstração de tabela

    // Tenta fazer uma busca na tabela, se não conseguir deixa um log e retorna com status code 500
    try {
      const listOfMovies = await moviesRepository.find(); // Busca entidades com o parâmetro da função, neste caso, busca todas as entidades

      return response.status(200).json(listOfMovies); // Responde a request com status code 200 e a lista de filmes
    } catch (error) {
      console.error(error);

      return response.status(500).send();
    }
  }

  async delete(request: Request, response: Response) {
    const { title } = request.body; // Desestruturação do item "title" do JSON que vem no body do request

    const moviesRepository = getCustomRepository(MoviesRepository); // Cria o objeto que representa a abstração de tabela

    // Tenta encontrar uma entidade com o title e tenta deletar, se não encontrar ou não conseguir deletar retorna com status code 500
    try {
      const movie = await moviesRepository.find({
        // Busca no repositório toda as entidades que na coluna title tenha o valor de title (valor desestruturado)
        where: { title },
      });

      if (!movie) {
        // Se não encontrar nada na busca, retorna com status 404
        return response.status(404).json({ error: "Movie not found!" });
      }

      await moviesRepository.remove(movie); // Deleta do banco todas as entidades encontradas

      return response.status(200).send();
    } catch (error) {
      console.log(error);

      return response.status(500).send();
    }
  }

  async update(request: Request, response: Response) {
    const { oldTitle, newTitle, newRating } = request.body; // Desestruturação dos itens "oldTitle", "newTitle" e "newRating" do JSON que vem no body do request

    const moviesRepository = getCustomRepository(MoviesRepository); // Cria o objeto que representa a abstração de tabela
    // Tenta buscar uma entidade com o valor de oldTitle, se encontrar, atualiza ela com os valores de newTitle e newRating
    try {
      const movieUpdate = await moviesRepository.findOne({
        // Busca no repositório uma entidade que na coluna title tenha o valor de oldTitle
        where: { title: oldTitle },
      });

      if (newTitle) {
        // Se na requisição, newTitle vir preenchido:
        movieUpdate.title = newTitle; // Troca o valor de title na entidade
      }

      if (newRating) {
        // Se na requisição, newRating vir preenchido:
        movieUpdate.rating = newRating; // Troca o valor de rating na entidade
      }

      moviesRepository.save(movieUpdate); // Salva no repositório a entidade atualizada

      return response.status(200).json();
    } catch (error) {
      console.error(error);

      return response.status(500).send();
    }
  }

  async listUnrated(request: Request, response: Response) {
    const { random } = request.query; // Desestruturação do valor de "random" nos parâmetros query da requisição

    const moviesRepository = getCustomRepository(MoviesRepository); // Cria o objeto que representa a abstração de tabela

    const randomNumberBetweenTwoValues = (min: number, max: number) => {
      // Função para gerar um valor aleatório entre dois números
      return Math.floor(Math.random() * (max - min) + min);
    };

    // Tenta procurar por movies sem avaliação. Se "random" vir preenchido, retorna uma entidade aleatória, se não retorna todas as entidades encontradas
    try {
      const moviesUnrated = await moviesRepository.find({
        // Busca no repositório toda as entidades que na coluna rating tenha o valor de -1 (ou seja, que não possuem avaliação)
        where: { rating: -1 },
      });

      if (random) {
        // Se random estiver preenchido:
        const randomIndexArray = randomNumberBetweenTwoValues(
          // Gera um valor aleatório entre:
          0, // 0, pois é o menor índice possível para um array
          moviesUnrated.length - 1 // Tamanho do array - 1, pois é o maior índice possível
        );

        return response.status(200).json([moviesUnrated[randomIndexArray]]); // Retorna uma entidade aleatória do array
      }

      return response.status(200).json(moviesUnrated);
    } catch (error) {
      console.error(error);

      response.status(500).send();
    }
  }
}

export { MovieController };
