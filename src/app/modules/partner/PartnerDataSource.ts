import { PartnerService } from './../../services/partner.service';
import { IPartner } from './../../models/IPartner';

import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { handleError } from 'src/app/utils/errorhandler';


export class PartnerDataSource implements DataSource<IPartner>
{
    private PartnersSubject = new BehaviorSubject<IPartner[]>([]);
    private PartnersCountSubject = new BehaviorSubject<number>(0);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.PartnersCountSubject.asObservable();

    constructor(private partnerService: PartnerService) { }

    connect(collectionViewer: CollectionViewer): Observable<IPartner[]> {
        return this.PartnersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.PartnersSubject.complete();
        this.loadingSubject.complete();
        this.PartnersCountSubject.complete();
    }

    fetchPartners(filterKey: string, sortField: string, sortOrder: string, filterValue: string, pageIndex = 0, pageSize = 10) {
        this.loadingSubject.next(true);
        this.partnerService.getList(filterKey,
            sortField, sortOrder, filterValue, pageIndex, pageSize).pipe(
                catchError(handleError<any>('fetchPartners', null)),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((partnerRoot => {
                this.PartnersSubject.next(partnerRoot.responses)
                this.PartnersCountSubject.next(partnerRoot.totalRows)
            })
            );
    }
}