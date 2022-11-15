export interface ServiceOrder {
    id?: any;
    openingDate?: Date;
    endingDate?: Date;
    priority: String;
    notes: String;
    status: String;
    technician: any;
    client: any;
};