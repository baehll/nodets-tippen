import {Connection, createConnection} from "typeorm";
import {Player} from "../models/player";

export interface DatabaseConfiguration {
    type: "postgres" | "mysql" | "mssql";
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export class DatabaseProvider {
    private static connection: Connection;
    private static configuration: DatabaseConfiguration;

    public static configure(dbConfiguration: DatabaseConfiguration) : void {
        DatabaseProvider.configuration = dbConfiguration;
    }

    public static async getConnection() : Promise<Connection> {
        if(DatabaseProvider.connection) {
            return DatabaseProvider.connection;
        }

        if(!DatabaseProvider.connection) {
            throw new Error("DatabaseProvider not configured yet");
        }

        const {type, host, port, username, password, database} = DatabaseProvider.configuration;

        DatabaseProvider.connection = await createConnection({
            type, host, port, username, password, database, 
            entities: [Player],
            autoSchemaSync: true
        } as any);

        return DatabaseProvider.connection;
    }
}