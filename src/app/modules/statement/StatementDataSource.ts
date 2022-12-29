import { StatementService } from './../../services/statement.service';
import { IStatement } from './../../models/IStatement';

import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { handleError } from 'src/app/utils/errorhandler';


export class StatementsDataSource implements DataSource<IStatement>
{
    private StatementsSubject = new BehaviorSubject<IStatement[]>([]);
    private StatementsCountSubject = new BehaviorSubject<number>(0);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.StatementsCountSubject.asObservable();

    constructor(private statementService: StatementService) { }

    connect(collectionViewer: CollectionViewer): Observable<IStatement[]> {
        return this.StatementsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.StatementsSubject.complete();
        this.loadingSubject.complete();
        this.StatementsCountSubject.complete();
    }

    fetchStatements(sortField: string, sortOrder: string, filterValue: string, pageIndex = 0, pageSize = 10,
        partnerId?: string) {
        this.loadingSubject.next(true);
        this.statementService.getList(
            sortField, sortOrder, filterValue, pageIndex, pageSize, partnerId).pipe(
                catchError(handleError<any>('fetchStatements', null)),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((statementRoot => {
                this.StatementsSubject.next(statementRoot.responses)
                this.StatementsCountSubject.next(statementRoot.totalRows)
            })
            );
    }
}