import BaseService from "./base.service";

export default class OrderService extends BaseService{
    constructor(){
        super({endpoint: "orders"})
    }
}