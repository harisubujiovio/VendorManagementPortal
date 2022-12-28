import { IUser } from "./IUser";

export interface IUserRoot {
    totalRows: number;

    responses: IUser[]
}