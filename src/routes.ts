import { Router } from "express"; // Objeto fornecido pelo express para gerenciar rotas em arquivos separados (garantindo princípios SOLID)
import { MovieController } from "./controllers/MovieController"; // Funções relacionadas as entidade da tabela "movies"
import { MovieValidator } from "./validators/MovieValidator"; // Middleware de validação de input do client-side da rota /movies

const routes = Router(); // Instância do objeto responsável pelas rotas da API

const movieValidator = new MovieValidator(); // Instância do validator referente a rota movies

const movieController = new MovieController(); // Instância do controller referente ao model "Movie"

routes.get("/movies", movieController.list); // Rota responsável por listar todos os filmes

routes.post("/movies", movieValidator.create, movieController.create); // Rota responsável por criar novos filmes

routes.put("/movies", movieValidator.update, movieController.update); // Rota responsável por atualizar alguma informação de um filme já existente

routes.delete("/movies", movieController.delete); // Rota responsável por deletar algum filme

routes.get("/unrated", movieController.listUnrated); // Rota responsável por listar filmes sem avaliação

export { routes };
