import { IStatement } from './IStatement';
export interface IStatementRoot {
    totalRows: number;

    responses: IStatement[]
}