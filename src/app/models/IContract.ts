
export interface IContract {
    id?: string;
    contractNo: string;
    contractTypeId: string;

    contractType?: string;

    contractDate: Date;

    startDate: Date;

    endDate: Date;

    renewalDate: Date;

    commissionMethodId: string;

    commissionMethod?: string;

    contractStatusId: string;

    contractStatus: string;

    partnerId: string;

    partner: string;

    createdBy?: string;

    createdDate?: Date;

    lastModifiedBy?: string;

    lastModifiedDate?: Date

}