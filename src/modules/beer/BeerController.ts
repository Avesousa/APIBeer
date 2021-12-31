import { Request, Response, Router } from "express";
import { APIException, mapErrorBeer } from "../../utils/APIMapper";
import BeerFacade from "./BeerFacade";
import Beer from "./models/Beer";

export default class BeerController {
    private facade: BeerFacade;

    constructor(router: Router) {
        this.facade = new BeerFacade();
        this.configureRoutes(router);
    }

    private configureRoutes(router: Router) {
        const routes = Router();
        routes.get('/beers/:id/boxprice', this.getBeerBoxPrice.bind(this));
        routes.get('/beers/:id', this.getBeer.bind(this));
        routes.route('/beers')
            .get(this.getListBeers.bind(this))
            .post(this.addBeer.bind(this));
        router.use(routes);
    }

    addBeer(req: Request, res: Response) {
        this.facade.addBeer(req)
            .then((beer: Beer) => res.status(201).send(beer))
            .catch((err) => res.status(400).send(err));
    }

    getBeerBoxPrice(req: Request, res: Response) {
        this.facade.getBeerBoxPrice(req)
            .then((response) => res.send(response))
            .catch((err: APIException) => res.status(err.code).send(err));
    }

    getBeer(req: Request, res: Response) {
        this.facade.getBeer(req)
            .then((beer: Beer) => {
                if(beer){
                    res.send(beer)
                }else{
                    throw mapErrorBeer(404);
                }
            })
            .catch((err: APIException) => res.status(err.code).send(err));
    }

    getListBeers(_req: Request, res: Response): void {
        this.facade.getListBeers()
            .then((response) => res.send(response))
            .catch((err: APIException) => res.status(err.code).send(err));
    }

}