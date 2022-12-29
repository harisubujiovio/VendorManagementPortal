import { SalesService } from './../../services/sales.service';
import { ISales } from './../../models/ISales';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { handleError } from 'src/app/utils/errorhandler';
import { IUser } from 'src/app/models/IUser';


export class SalesDataSource implements DataSource<ISales>
{
    private SalesSubject = new BehaviorSubject<ISales[]>([]);
    private SalesCountSubject = new BehaviorSubject<number>(0);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.SalesCountSubject.asObservable();

    constructor(private salesService: SalesService) { }

    connect(collectionViewer: CollectionViewer): Observable<ISales[]> {
        return this.SalesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.SalesSubject.complete();
        this.loadingSubject.complete();
        this.SalesCountSubject.complete();
    }

    fetchSales(sortField: string, sortOrder: string, filterValue: string, pageIndex = 0,
        pageSize = 10, partnerId?: string) {
        this.loadingSubject.next(true);
        this.salesService.getList(
            sortField, sortOrder, filterValue, pageIndex, pageSize, partnerId).pipe(
                catchError(handleError<any>('fetchSales', null)),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((salesRoot => {
                this.SalesSubject.next(salesRoot.responses)
                this.SalesCountSubject.next(salesRoot.totalRows)
            })
            );
    }
}