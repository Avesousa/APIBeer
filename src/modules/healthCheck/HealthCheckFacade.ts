import pkg from "../../../package.json";
import CurrencyFacade from "../currency/CurrencyFacade";
import HealthCheckResponse from "./models/HealthCheckResponse";
export default class HealthCheckFacade {

  private currency: CurrencyFacade;

  constructor(){
    this.currency = new CurrencyFacade();
  }

  healthCheck(): HealthCheckResponse {
    return {
      status: "UP",
      appName: pkg.name,
      version: pkg.version,
      author: pkg.author,
    };
  }
}
