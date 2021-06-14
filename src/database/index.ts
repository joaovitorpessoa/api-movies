import { Connection, createConnection, getConnectionOptions } from "typeorm";
// Respectivamente:
// {
//   Parâmetro de tipagem para o generic de promises de conexão do typeORM,
//   Função para criação de conexão com o DB,
//   Função para obter a configuração dada no arquivo ormconfig.json
// }

export default async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions(); // Pega as informações de ormconfig.json e transforma em um objeto

  if (process.env.NODE_ENV === "test") {
    // Se a API estiver em ambiente de test, utiliza um DB alternativo ao da produção
    Object.assign(connectionOptions, {
      database: "./src/database/database.test.sqlite",
    });
  }

  return createConnection(connectionOptions); // Retorna uma conexão com o DB
};
