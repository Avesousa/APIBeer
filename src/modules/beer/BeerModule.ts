import { Router } from "express";
import BeerController from "./BeerController";

export default class BeerModule {
    private controller: BeerController;

    constructor(router: Router){
        this.controller = new BeerController(router);
    }

}