export class Table {

    id: number;
    description: string;
    account: string;
    createdOn: string;
    createdBy: string;
    currency: string;

    constructor(id: number, description: string, account: string, createdOn: string, createdBy: string, currency: string) {
        this.id = id
        this.description = description
        this.account = account
        this.createdOn = createdOn
        this.createdBy = createdBy
        this.currency = currency
    }
}