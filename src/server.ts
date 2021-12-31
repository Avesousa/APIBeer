import express, { Application, Router, Request } from 'express';
import cors from "cors";
import morgan from 'morgan';
import generateRequestId from "./middlewares/generateRequestId";

import modules from "./modules";
import config from "./utils/config";

morgan.token('id', (req: Request) => {
    return req.id;
});

export class Server {
    private expressApp: Application;
    private router: Router;
    private morganFormat: string;
    private config: any;

    constructor() {
        this.expressApp = express();
        this.router = express.Router();
        this.morganFormat = ":date[iso] [:method] :id [:status] [:response-time] :url";
        this.config = config();
        this.configExpress();
    }

    private configExpress(): void {
        this.expressApp.use(cors());
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({ extended: true }));
        this.expressApp.use(morgan(this.morganFormat));
        this.expressApp.use(generateRequestId);
        this.createModule();
    }
    private createModule(): void {
        modules.forEach((module) => new module(this.router));
        this.expressApp.use(this.router);
    }

    private showServerConnection(): void {
        console.info(
            `Runing expressApp on port ${this.config.portMain} in http://${this.config.basePath}:${this.config.portMain}`
        );
        console.info(
            `Health Check on http://${this.config.basePath}:${this.config.portMain}/api/health-check`
        );
    }

    public run(): void {
        this.expressApp.listen(this.config.portMain, () => {
            this.showServerConnection();
        });
    }
}