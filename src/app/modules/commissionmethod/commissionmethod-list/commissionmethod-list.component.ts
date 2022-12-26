import { IResourceRoot } from './../../../models/IResourceRoot';
import { CommissionmethodService } from './../../../services/commissionmethod.service';
import { ErrorhandlerService } from './../../../shared/errorhandler.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ResourceDataSource } from 'src/app/shared/ResourceDataSource';
import { ConfirmationComponent } from 'src/app/shared/dialogs/confirmation/confirmation.component';
import { merge, tap } from 'rxjs';
import { IResource } from 'src/app/models/IResource';

@Component({
  selector: 'app-commissionmethod-list',
  templateUrl: './commissionmethod-list.component.html',
  styleUrls: ['./commissionmethod-list.component.css']
})
export class CommissionmethodListComponent implements OnInit, AfterViewInit {

  dataSource: ResourceDataSource<IResource>;
  displayedColumns = ["code", "description", "update", "delete"];
  dataLength: number
  private dialogConfig: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  private filterValue: string = '';
  constructor(private commissionmethodS: CommissionmethodService, private router: Router, private dialog: MatDialog,
    private errorService: ErrorhandlerService) { }

  ngOnInit(): void {
    this.dataSource = new ResourceDataSource(this.commissionmethodS);
    this.dataSource.fetchResource('code', 'asc', '');
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
        tap(() => this.BindCommissionMethods())
      )
      .subscribe();
  }
  BindCommissionMethods() {
    console.log(this.filterValue);
    this.dataSource.fetchResource(
      this.sort.active,
      this.sort.direction,
      this.filterValue,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  public redirectToDetails = (id: string) => {
    let url: string = `/commissionmethod/details/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {
    let url: string = `/commissionmethod/edit/${id}`;
    this.router.navigate([url]);
  }
  public delete = (id: string) => {
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
        this.commissionmethodS.delete(id).subscribe({
          next: () => {
            this.paginator.pageIndex = 0;
            this.BindCommissionMethods();
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
