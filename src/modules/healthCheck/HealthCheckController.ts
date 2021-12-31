import { Request, Response, NextFunction, Router } from 'express';
import HealthCheckFacade from './HealthCheckFacade';

export default class HealthCheckController {
    private facade: HealthCheckFacade;

    constructor(router: Router) {
        this.facade = new HealthCheckFacade();
        this.configureRoutes(router);
    }

    private configureRoutes(router: Router) {
        const routes = Router();
        routes.get('/health-check', this.healthCheck.bind(this));
        router.use(routes);
    }

    healthCheck(_req: Request, res: Response): void {
        res.send(this.facade.healthCheck());
    }
}
