import swaggerUi from "swagger-ui-express"; // Importação do Swagger
import cors from "cors"; // Importação do cors: Cross-origin resource sharing
import swaggerFile from "./swagger.json"; // Import do JSON de configuração que está na raiz do diretório
import "reflect-metadata"; // Dependência do typeORM p/ lidar com decorators
import createConnection from "./database"; // Função para criar conexão com o DB
import express, { json } from "express"; // Middleware padrão do express p/ lidar com content-type application/json
import { routes } from "./routes"; // Rotas da API

createConnection(); // Cria conexão com o DB
const app = express(); // Instância do framework para criar a aplicação em cima deste

app.use(cors()); // Middleware do cors para gerenciar políticas de acesso a api: sem nenhum parâmetros, todos podem acessar a API
app.use(json()); // Middleware para trabalhar com JSON
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // Define a rota e o arquivo de configuração do Swagger
app.use(routes); // Rotas criadas em ./routes.ts

export { app };
