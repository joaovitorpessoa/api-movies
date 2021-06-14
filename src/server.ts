import { app } from "./app"; // Import da API

app.listen(process.env.PORT || 3333, () =>
  console.log("Server is running! 🚀")
); // Roda a aplicação na porta informada pela variável de ambiente
