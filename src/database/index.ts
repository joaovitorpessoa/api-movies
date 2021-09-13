import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();

  if (process.env.NODE_ENV === "test") {
    Object.assign(connectionOptions, {
      database: "./src/database/database.test.sqlite",
    });
  }

  return createConnection(connectionOptions);
};
