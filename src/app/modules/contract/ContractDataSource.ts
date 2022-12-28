import { ContractService } from './../../services/contract.service';
import { IContract } from './../../models/IContract';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { handleError } from 'src/app/utils/errorhandler';


export class ContractDataSource implements DataSource<IContract>
{
    private ContractsSubject = new BehaviorSubject<IContract[]>([]);
    private ContractsCountSubject = new BehaviorSubject<number>(0);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.ContractsCountSubject.asObservable();

    constructor(private contractService: ContractService) { }

    connect(collectionViewer: CollectionViewer): Observable<IContract[]> {
        return this.ContractsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.ContractsSubject.complete();
        this.loadingSubject.complete();
        this.ContractsCountSubject.complete();
    }

    fetchContracts(sortField: string, sortOrder: string, filterValue: string, pageIndex = 0, pageSize = 10) {
        this.loadingSubject.next(true);
        this.contractService.getList(
            sortField, sortOrder, filterValue, pageIndex, pageSize).pipe(
                catchError(handleError<any>('fetchContracts', null)),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((contractRoot => {
                this.ContractsSubject.next(contractRoot.responses)
                this.ContractsCountSubject.next(contractRoot.totalRows)
            })
            );
    }
}