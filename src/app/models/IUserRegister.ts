import { IUser } from "./IUser";

export interface IUserRegister extends IUser {
    password: string;
}