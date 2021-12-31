import config, { ConfigModel } from './config';
import mysql, { Connection } from 'mysql2/promise';
export default class ClientMysql {

    private config: ConfigModel;

    constructor(){
        this.config = config();
    }
    
    public async query(sqlQuery: string): Promise<any> {
        const con = await this.connect();
        const [result,] = await con.execute(sqlQuery);
        return result;
    }

    private async connect(): Promise<Connection> {
        return await mysql.createConnection(this.config.database);
    }

}