import { RoleService } from './../../../services/role.service';
import { ErrorhandlerService } from './../../../shared/errorhandler.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/shared/dialogs/confirmation/confirmation.component';
import { merge, tap } from 'rxjs';
import { RoleDataSource } from '../Roledatasource';



@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  dataSource: RoleDataSource;
  displayedColumns = ["name", "description", "update", "delete"];
  dataLength: number
  private dialogConfig: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  private filterValue: string = '';
  constructor(private roleS: RoleService, private router: Router, private dialog: MatDialog,
    private errorService: ErrorhandlerService) { }

  ngOnInit(): void {
    this.dataSource = new RoleDataSource(this.roleS);
    this.dataSource.fetchRoles('name', 'asc', '');
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
        tap(() => this.BindRoles())
      )
      .subscribe();
  }
  BindRoles() {
    console.log(this.filterValue);
    this.dataSource.fetchRoles(
      this.sort.active,
      this.sort.direction,
      this.filterValue,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  public redirectToDetails = (id: string) => {
    let url: string = `/role/details/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {
    let url: string = `/role/edit/${id}`;
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
        this.roleS.deleteRole(id).subscribe({
          next: () => {
            this.paginator.pageIndex = 0;
            this.BindRoles();
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
