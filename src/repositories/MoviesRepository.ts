import { EntityRepository, Repository } from "typeorm"; // Decorator responsável por mapear repositórios (abstração de tabela)
import { Movie } from "../models/Movie"; // Model/entitie "Movie" que representa o schema de linha presente na tabela "movies"

@EntityRepository(Movie) // Mapeamento do repositório custom, passando o tipo de dado que ele irá guardar
class MoviesRepository extends Repository<Movie> {} // Criação de um repositório custom herdando a classe genérica de repositório do typeORM

export { MoviesRepository };
