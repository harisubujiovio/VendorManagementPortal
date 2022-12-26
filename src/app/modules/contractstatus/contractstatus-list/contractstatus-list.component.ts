
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
import { ContractstatusService } from 'src/app/services/contractstatus.service';

@Component({
  selector: 'app-contractstatus-list',
  templateUrl: './contractstatus-list.component.html',
  styleUrls: ['./contractstatus-list.component.css']
})
export class ContractstatusListComponent implements OnInit, AfterViewInit {

  dataSource: ResourceDataSource<IResource>;
  displayedColumns = ["code", "description", "update", "delete"];
  dataLength: number
  private dialogConfig: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  private filterValue: string = '';
  constructor(private contractstatusS: ContractstatusService, private router: Router, private dialog: MatDialog,
    private errorService: ErrorhandlerService) { }

  ngOnInit(): void {
    this.dataSource = new ResourceDataSource(this.contractstatusS);
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
        tap(() => this.BindContractStatus())
      )
      .subscribe();
  }
  BindContractStatus() {
    console.log(this.filterValue);
    this.dataSource.fetchResource(
      this.sort.active,
      this.sort.direction,
      this.filterValue,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  public redirectToDetails = (id: string) => {
    let url: string = `/contractstatus/details/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {
    let url: string = `/contractstatus/edit/${id}`;
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
        this.contractstatusS.delete(id).subscribe({
          next: () => {
            this.paginator.pageIndex = 0;
            this.BindContractStatus();
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
