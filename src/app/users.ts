export class Users{
    login:string; 
    email:string; 
    password:string;
    income: Array<Source>;
    expenditures: Array<Source>;
}

export class Source{
    date: string; 
    value: number; 
    currency: string;
    source: string;
    card: boolean;
}