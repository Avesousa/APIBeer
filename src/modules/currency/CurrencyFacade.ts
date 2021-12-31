import config, { ConfigModel } from './../../utils/config';
import Client from "../../utils/client";
import Transaction from './models/Transaction';
import e from 'express';

export default class CurrencyFacade {

    private client: Client;
    private config: ConfigModel;

    constructor(){
        this.config = config();
        this.client = new Client({
            baseUrl: this.config.currencyPath    
        });
    }

    private getEndpoint(transaction: Transaction): string {
        return `${this.config.currencyPath}?access_key=${this.config.currencyAccessKey}&currencies=${transaction.to}&source=${transaction.from}&format=1`;
    }

    public convert(transaction: Transaction): Promise<number>{
        if(transaction.from == transaction.to){
            return Promise.resolve(transaction.amount);
        }else{
            return this.client.get(this.getEndpoint(transaction)).then((response: any) => {
                const { data } = response;
                console.log('Response of currency api', data);
                if(data.success){
                    const pairCurrency = Object.keys(response.data.quotes)[0];
                    const pricePairCurrency = response.data.quotes[pairCurrency];
                    return transaction.amount * pricePairCurrency;
                }else{
                    throw data?.error;
                }
            })
            .catch((err: any) => {
                console.log('Convert is a error: ', err);
                throw err;
            })
        }
    }

}