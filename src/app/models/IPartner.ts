
export interface IPartner {
    id?: string;
    partnerNo: string;
    partnerName: string;

    email: string;

    mobileNumber: string;

    partnerTypeId: string;

    partnerType?: string;

    createdBy?: string;

    createdDate?: Date;

    lastModifiedBy?: string;

    lastModifiedDate?: Date

}