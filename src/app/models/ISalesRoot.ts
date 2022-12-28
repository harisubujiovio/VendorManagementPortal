import { ISales } from './ISales';

export interface ISalesRoot {
    totalRows: number;

    responses: ISales[]
}