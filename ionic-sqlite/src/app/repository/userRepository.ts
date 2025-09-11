import { Conn } from "../services/conn";

export class UserRepository {
     public async select(conn: Conn){
        if(!conn.database){
            await conn.createDataBase();
        }
        const select = "SELECT name, edad FROM usuario";
        return await conn.database.executeSql(
            select,
            []
        ).catch((error) => {
                console.log('error al aztualizar', error);
            })
    }

    public async insert(conn: Conn, name: string, edad: number){
        if(!conn.database){
            await conn.createDataBase();
        }
        const select = "INSERT INTO usuario(name, edad) VALUES(?, ?)";
        return await conn.database.executeSql(
            select,
            [
                name,
                edad
            ]
        ).catch((error) => {
                console.log('error al aztualizar', error);
            });
    }
}