
export interface IStatement {
    id?: string;
    statementNo: string;
    statementDate: Date;

    endDate: Date;

    status: string;

    partner: string;

    partnerId: string;

    contractId: Date;

    contractNo: string;

    createdBy?: string;

    createdDate?: Date;

    lastModifiedBy?: string;

    lastModifiedDate?: Date

}