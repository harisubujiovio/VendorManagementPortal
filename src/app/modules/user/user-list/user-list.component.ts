import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationComponent } from 'src/app/shared/dialogs/confirmation/confirmation.component';
import { ErrorhandlerService } from 'src/app/shared/errorhandler.service';
import { UserDataSource } from '../UserDataSource';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  dataSource: UserDataSource;
  displayedColumns = ["firstName", "lastName", "email", "mobileNumber", "address", "role", "update", "delete"];
  dataLength: number
  private dialogConfig: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  private filterValue: string = '';
  constructor(private userS: UserService, private router: Router, private dialog: MatDialog,
    private errorService: ErrorhandlerService) { }

  ngOnInit(): void {
    this.dataSource = new UserDataSource(this.userS);
    this.dataSource.fetchUsers('firstName', 'asc', '');
    this.dataSource.count$.subscribe(
      (length: number) => this.dataLength = length
    )
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: false,
      data: {}
    }
  }
  ngAfterViewInit() {

    // reset the paginator after sortin

    merge(this.paginator.page)
      .pipe(
        tap(() => this.BindUsers())
      )
      .subscribe();
  }
  BindUsers() {
    console.log(this.filterValue);
    this.dataSource.fetchUsers(
      this.sort.active,
      this.sort.direction,
      this.filterValue,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  public redirectToDetails = (id: string) => {
    let url: string = `/user/details/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {
    let url: string = `/user/edit/${id}`;
    this.router.navigate([url]);
  }
  public delete = (id: string) => {
    console.log("delete called")
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    })

    //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userS.deleteUser(id).subscribe({
          next: () => {
            this.paginator.pageIndex = 0;
            this.BindUsers();
          },
          error: error => {
            this.errorService.dialogConfig = { ...this.dialogConfig };
            this.errorService.handleError(error);
          }
        });
      }
    });

  }
}
