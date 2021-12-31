export interface ConfigModel {
    portMain: string;
    basePath: string;
    env: string;
    currencyAccessKey?: string;
    currencyPath?: string;
    database: {
        host: string,
        user: string,
        password: string,
        database: string
    }
}


export default function config() {  
    return {
        portMain: process.env.PORT_MAIN || '3000',
        basePath: process.env.BASE_PATH || 'localhost',
        env: process.env.NODE_ENV || 'NULL',
        currencyAccessKey: process.env.CURR_ACCESS_KEY,
        currencyPath: process.env.CURR_PATH,
        database: {
            host: process.env.DB_HOST || "mysql_server",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "secret123",
            database: process.env.DB_DATABASE || "beerChallenge"
        }
    }  
};

