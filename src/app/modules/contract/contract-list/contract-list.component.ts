
import { ContractService } from './../../../services/contract.service';

import { ErrorhandlerService } from './../../../shared/errorhandler.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/shared/dialogs/confirmation/confirmation.component';
import { merge, tap } from 'rxjs';
import { ContractDataSource } from '../ContractDataSource';
import { IUserSession } from 'src/app/models/IUserSession';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  dataSource: ContractDataSource;
  displayedColumns = ["contractNo", "contractType", "contractDate", "startDate",
    "endDate", "renewalDate", "commissionMethod", "contractStatus",
    "partner", "update", "delete"];
  dataLength: number
  private dialogConfig: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  private filterValue: string = '';

  user: IUserSession | null;

  constructor(
    private authService: AuthenticationService,
    private contractS: ContractService,
    private router: Router, private dialog: MatDialog,
    private errorService: ErrorhandlerService) {
    this.user = this.authService.loggedInUser;
  }

  ngOnInit(): void {
    this.dataSource = new ContractDataSource(this.contractS);
    this.dataSource.fetchContracts('contractNo', 'asc', '', 0, 10, this.user?.PartnerId);
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
        tap(() => this.BindContracts())
      )
      .subscribe();
  }
  onKeyUpEvent(event: any) {
    console.log(event.target.value);
    this.filterValue = event.target.value;
    this.BindContracts();
  }
  BindContracts() {
    console.log(this.filterValue);
    this.dataSource.fetchContracts(
      this.sort.active,
      this.sort.direction,
      this.filterValue,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.user?.PartnerId);
  }
  public redirectToDetails = (id: string) => {
    let url: string = `/contract/details/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {
    let url: string = `/contract/edit/${id}`;
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
        this.contractS.deleteContract(id).subscribe({
          next: () => {
            this.paginator.pageIndex = 0;
            this.BindContracts();
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
