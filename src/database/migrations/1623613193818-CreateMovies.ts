import { MigrationInterface, QueryRunner, Table } from "typeorm";
// Respectivamente:
// {
//   Import que vem por default ao rodar "typeorm migration:create -n <nome da migration>",
//   Import que vem por default ao rodar "typeorm migration:create -n <nome da migration>",
//   Classe utilizada para criar tabelas sem o uso direto de SQL
// }

export class CreateMovies1623613193818 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // O código abaixo é executado com "typeorm migration:run"
    await queryRunner.createTable(
      // Cria a tabela "movies"
      new Table({
        name: "movies",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "rating",
            type: "float",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // O código abaixo é executado com "typeorm migration:revert"
    await queryRunner.dropTable("movies"); // Apaga a tabela "movies"
  }
}
