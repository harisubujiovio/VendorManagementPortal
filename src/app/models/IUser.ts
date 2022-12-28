export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;

    email: string;

    mobileNumber: string;

    address?: string;

    roleid: string;

    createdBy?: string;

    createdDate?: Date;

    lastmodifiedBy?: string;

    lastmodifiedDate?: Date

}