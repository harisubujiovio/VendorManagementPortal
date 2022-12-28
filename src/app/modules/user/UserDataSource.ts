import { UserService } from './../../services/user.service';
import { RoleService } from '../../services/role.service';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { handleError } from 'src/app/utils/errorhandler';
import { IUser } from 'src/app/models/IUser';


export class UserDataSource implements DataSource<IUser>
{
    private UsersSubject = new BehaviorSubject<IUser[]>([]);
    private UsersCountSubject = new BehaviorSubject<number>(0);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.UsersCountSubject.asObservable();

    constructor(private userService: UserService) { }

    connect(collectionViewer: CollectionViewer): Observable<IUser[]> {
        return this.UsersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.UsersSubject.complete();
        this.loadingSubject.complete();
        this.UsersCountSubject.complete();
    }

    fetchUsers(sortField: string, sortOrder: string, filterValue: string, pageIndex = 0, pageSize = 10) {
        this.loadingSubject.next(true);
        this.userService.getList(
            sortField, sortOrder, filterValue, pageIndex, pageSize).pipe(
                catchError(handleError<any>('fetchUsers', null)),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((userRoot => {
                this.UsersSubject.next(userRoot.responses)
                this.UsersCountSubject.next(userRoot.totalRows)
            })
            );
    }
}