

export class HeroeModel{
    id?: string ;
    name: string ;
    product: string ;
    price: number;
    paid: number;
    status: boolean ;
    
    constructor(){
        this.status = true ;
        this.id = '' ;
        this.name = '' ;
        this.product = '' ;
        this.price = 0 ;
        this.paid = 0 ;
    }
}