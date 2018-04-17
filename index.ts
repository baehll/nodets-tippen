import {Server} from "./src/server/index";
import "reflect-metadata";
import {DatabaseProvider} from "./src/database/index";

DatabaseProvider.configure({
    type: process.env.DATABASE_TYPE as any || "mysql",
    database: process.env.DATABASE_NAME || "matchdb",
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || "root",
    host: process.env.DATABASE_HOST || "localhost",
    port: +process.env.DATABASE_PORT || 4000
});

const server = new Server();
server.start(+process.env.PORT || 8080);