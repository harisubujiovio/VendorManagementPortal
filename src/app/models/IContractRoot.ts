import { IContract } from './IContract';
export interface IContractRoot {
    totalRows: number;

    responses: IContract[]
}