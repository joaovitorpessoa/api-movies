import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
// Respectivamente:
// {
//   Decorator responsável pelo mapeamento das colunas "comuns",
//   Decorator responsável pelo mapeamento da coluna que irá conter a data de inserção do linha,
//   Decorator responsável pelo mapeamento do schema de dado que será salvo na tabela passada no seu parâmetro,
//   Decorator responsável pelo mapeamento da coluna que possui a chave primária
// }

import { v4 as uuid } from "uuid"; // Importa a função de gerar uuid na versão 4 com o apelido de "uuid"

@Entity("movies") // Mapeamento da classe Movie que representa as colunas da tabela "movies"
class Movie {
  @PrimaryColumn() // Mapeamento do tipo no Typescript que a coluna "id" irá ter
  readonly id: string;

  @Column() // Mapeamento do tipo no Typescript que a coluna "title" irá ter
  title: string;

  @Column() // Mapeamento do tipo no Typescript que a coluna "rating" irá ter
  rating: number;

  @CreateDateColumn() // Mapeamento do tipo no Typescript que a coluna "created_at" irá ter
  created_at: Date;

  constructor() {
    if (!this.id) {
      // Se o "id" do dado não vier preenchido, atribui a ele um uuid
      this.id = uuid();
    }
  }
}

export { Movie };
