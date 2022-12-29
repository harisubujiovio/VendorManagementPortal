import { SalesService } from './../../../services/sales.service';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationComponent } from 'src/app/shared/dialogs/confirmation/confirmation.component';
import { ErrorhandlerService } from 'src/app/shared/errorhandler.service';
import { SalesDataSource } from '../SalesDataSource';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IUserSession } from 'src/app/models/IUserSession';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {

  dataSource: SalesDataSource;
  // displayedColumns = ["entryNo", "source", "partner", "documentType", "code",
  //   "documentLineNo", "date", "no", "quantity", "uom", "unitPrice",
  //   "netAmount", "gst", "discount", "cardPaidAmount", "loyaltyPoints",
  //   "promotionTxrn", "costShareOnDiscountAmount", "loyaltyShareAmount",
  //   "commissionValue", "promoCommissionValue", "commissionAmount", "costShareAmount"];

  displayedColumns = ["entryNo", "source", "partner", "documentType", "code",
    "documentLineNo", "date", "no", "quantity", "uom", "unitPrice",
    "netAmount", "gst"];
  dataLength: number
  private dialogConfig: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  private filterValue: string = '';

  user: IUserSession | null;

  constructor(private authService: AuthenticationService,
    private salesS: SalesService,
    private router: Router, private dialog: MatDialog,
    private errorService: ErrorhandlerService) {
    this.user = this.authService.loggedInUser;
  }
  ngOnInit(): void {
    this.dataSource = new SalesDataSource(this.salesS);
    this.dataSource.fetchSales('entryNo', 'asc', '', 0, 10, this.user?.PartnerId);
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
        tap(() => this.BindSales())
      )
      .subscribe();
  }
  BindSales() {
    console.log(this.filterValue);
    this.dataSource.fetchSales(
      this.sort.active,
      this.sort.direction,
      this.filterValue,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.user?.PartnerId);
  }
  public redirectToDetails = (id: string) => {
    let url: string = `/sales/details/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {
    let url: string = `/sales/edit/${id}`;
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
        this.salesS.deleteSales(id).subscribe({
          next: () => {
            this.paginator.pageIndex = 0;
            this.BindSales();
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
