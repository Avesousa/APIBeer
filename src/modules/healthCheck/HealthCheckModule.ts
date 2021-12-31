import { Router } from "express";

import HealthCheckController from "./HealthCheckController";

export default class HealthCheckModule {
    private controller: HealthCheckController;

    constructor(router: Router) {
        this.controller = new HealthCheckController(router);
    }

}