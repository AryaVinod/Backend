import { DataSource } from "typeorm";
import Employee from "../entity/employee.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";



const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8765,
    username: "postgres",
    password: "postgres",
    database: "training",
    entities: ["dist/src/entity/*.js"],
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    // synchronize: true
    migrations: ["dist/src/db/migrations/*.js"],
    
});

export default dataSource;
