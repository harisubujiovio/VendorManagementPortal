import { RoleService } from '../../services/role.service';
import { IRole } from '../../models/IRole';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { handleError } from 'src/app/utils/errorhandler';


export class RoleDataSource implements DataSource<IRole>
{
    private RolesSubject = new BehaviorSubject<IRole[]>([]);
    private RolesCountSubject = new BehaviorSubject<number>(0);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.RolesCountSubject.asObservable();

    constructor(private roleService: RoleService) { }

    connect(collectionViewer: CollectionViewer): Observable<IRole[]> {
        return this.RolesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.RolesSubject.complete();
        this.loadingSubject.complete();
        this.RolesCountSubject.complete();
    }

    fetchRoles(sortField: string, sortOrder: string, filterValue: string, pageIndex = 0, pageSize = 10) {
        this.loadingSubject.next(true);
        this.roleService.getList(
            sortField, sortOrder, filterValue, pageIndex, pageSize).pipe(
                catchError(handleError<any>('fetchRoles', null)),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((roleRoot => {
                this.RolesSubject.next(roleRoot.responses)
                this.RolesCountSubject.next(roleRoot.totalRows)
            })
            );
    }
}