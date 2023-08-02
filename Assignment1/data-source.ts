import { DataSource } from "typeorm";
import Employee from "./employee";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";



const dataSouce = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8765,
    username: "postgres",
    password: "postgres",
    database: "training",
    entities: [Employee],
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true
    
});

export default dataSouce;