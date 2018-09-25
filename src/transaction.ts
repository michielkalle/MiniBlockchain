/**
 * Abstract transaction with data.
 * We need to determine some usefull properties here
 */
export class Transaction {
    data: {}

    constructor(data: any) {
        this.data = data;
    }
}