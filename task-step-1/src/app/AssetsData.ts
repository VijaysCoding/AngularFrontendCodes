export class AssetsData {
    id: number;
    description: string;
    account: number;
    createdOn: Date;
    createdBy: string;
    currency: string;

    constructor(data: any) {
        this.id = data.id;
        this.description = data.description;
        this.account = data.account;
        this.createdOn = data.creaetdOn;
        this.createdBy = data.createdBy;
        this.currency = data.currency;
    }
}