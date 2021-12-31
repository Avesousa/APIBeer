import { Request } from "express";
import ClientMysql from "../../utils/clientMysql";
import { mapErrorBeer } from "../../utils/APIMapper";
import CurrencyFacade from "../currency/CurrencyFacade";
import Beer from "./models/Beer";
import BoxPrice from "./models/BoxPrice";

export default class BeerFacade {
  private mysql: ClientMysql;
  private currency: CurrencyFacade;
  private query = "SELECT * FROM beer";

  constructor() {
    this.mysql = new ClientMysql();
    this.currency = new CurrencyFacade();
  }

  public async addBeer(req: Request): Promise<Beer> {
    // ID segun documentacion viene en el request, por eso valido por el
    const { id } = req.body;
    if(id){
      if(await this.veryficBeer(id)){
        const query = this.createInsertQuery(req.body);
        return this.mysql.query(query).then((response) => {
          const beer: Beer = req.body;
          beer.id = response.insertId;
          return beer;
        })
        .catch((err) => {
          console.log('Error addbeer', err);
          throw mapErrorBeer(400, err);
        })
      }else{
        throw mapErrorBeer(409);
      }
    }else {
      console.error('ID not found');
      throw mapErrorBeer(400);
    }
    
  }

  public async getListBeers(): Promise<Beer[]> {
    return this.mysql
      .query(this.query)
      .then((beers: Beer[]) => beers)
      .catch((err) => { throw mapErrorBeer(400,err) });
  }

  public async getBeer(data: Request | number | string): Promise<Beer> {
    const id = typeof data == "object"  ? data.params.id : data;
    return this.mysql.query(`${this.query} WHERE id = ${id}`)
      .then((beers: Beer[]) => {
        const beer = beers[0];
        return beer;
      })
      .catch((err: any) => {
        throw mapErrorBeer(400, err, "Ha ocurrido un error con la busqueda");
      });
  }

  public async getBeerBoxPrice(req: Request): Promise<BoxPrice> {
    const { currency, quantity } = req.query;
    const { id } = req.params;
    return this.getBeer(id)
      .then((beer: Beer) => {
        if(beer){
          const transaction = {
            from: beer.currency,
            to: currency ? currency.toString() : "EUR",
            amount: beer.price * (quantity ? parseInt(quantity.toString()) : 6),
          }
          console.log('It is transaction', transaction);
          return this.currency
            .convert(transaction)
            .then((price: number) => { return { priceTotal: price } })
            .catch((err: any) => { throw mapErrorBeer(400, err, "Ha ocurrido un error con el calculo del precio") });
        }else {
          throw mapErrorBeer(404);
        }
      }).catch((err) => { throw err });
  }

  private async veryficBeer(id: string): Promise<boolean> {
      const beer = await this.getBeer(id);
      return !(!!beer);
  }

  private createInsertQuery(body: any): string {
    //Utilizo la referencias en minuscula
    const { name, brewery, country, price, currency } = body;
    if (!!name && !!brewery && !!country && !!price && !!currency){
      return `INSERT INTO beer (name, brewery, country, price, currency) VALUES ('${name}','${brewery}','${country}',${price},'${currency}')`;
    }else{
      console.error('Create insert query', body);
      throw mapErrorBeer(400);
    }
  }

}
