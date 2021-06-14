import "reflect-metadata"; // Dependência do typeORM p/ lidar com decorators
import createConnection from "./database"; // Função para criar conexão com o DB
import express, { json } from "express"; // Middleware padrão do express p/ lidar com content-type application/json
import { routes } from "./routes"; // Rotas da API

createConnection(); // Cria conexão com o DB
const app = express(); // Instância do framework para criar a aplicação em cima deste

app.use(json()); // Middleware para trabalhar com JSON
app.use(routes); // Rotas criadas em ./routes.ts

export { app };
