import { StatementService } from './../../../services/statement.service';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationComponent } from 'src/app/shared/dialogs/confirmation/confirmation.component';
import { ErrorhandlerService } from 'src/app/shared/errorhandler.service';
import { StatementsDataSource } from '../StatementDataSource';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IUserSession } from 'src/app/models/IUserSession';

@Component({
  selector: 'app-statement-list',
  templateUrl: './statement-list.component.html',
  styleUrls: ['./statement-list.component.css']
})
export class StatementListComponent implements OnInit {

  dataSource: StatementsDataSource;
  displayedColumns = ["statementNo", "statementDate", "startDate", "endDate", "status",
    "partner", "contractNo"];
  dataLength: number
  private dialogConfig: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  private filterValue: string = '';

  user: IUserSession | null;

  constructor(private authService: AuthenticationService,
    private statementS: StatementService,
    private router: Router, private dialog: MatDialog,
    private errorService: ErrorhandlerService) {
    this.user = this.authService.loggedInUser;
  }

  ngOnInit(): void {
    this.dataSource = new StatementsDataSource(this.statementS);
    this.dataSource.fetchStatements('statementNo', 'asc', '', 0, 10, this.user?.PartnerId);
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
        tap(() => this.BindStatements())
      )
      .subscribe();
  }
  onKeyUpEvent(event: any) {
    console.log(event.target.value);
    this.filterValue = event.target.value;
    this.BindStatements();
  }
  BindStatements() {
    console.log(this.filterValue);
    this.dataSource.fetchStatements(
      this.sort.active,
      this.sort.direction,
      this.filterValue,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.user?.PartnerId);
  }
  public redirectToDetails = (id: string) => {
    let url: string = `/statement/details/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {
    let url: string = `/statement/edit/${id}`;
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
        this.statementS.deleteStatement(id).subscribe({
          next: () => {
            this.paginator.pageIndex = 0;
            this.BindStatements();
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
