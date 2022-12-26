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
import { PartnertypeService } from 'src/app/services/partnertype.service';


@Component({
  selector: 'app-partnertype-list',
  templateUrl: './partnertype-list.component.html',
  styleUrls: ['./partnertype-list.component.css']
})
export class PartnertypeListComponent implements OnInit, AfterViewInit {

  dataSource: ResourceDataSource<IResource>;
  displayedColumns = ["code", "description", "update", "delete"];
  dataLength: number
  private dialogConfig: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  private filterValue: string = '';
  constructor(private partnertypeS: PartnertypeService, private router: Router, private dialog: MatDialog,
    private errorService: ErrorhandlerService) { }

  ngOnInit(): void {
    this.dataSource = new ResourceDataSource(this.partnertypeS);
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
        tap(() => this.BindPartnerTypes())
      )
      .subscribe();
  }
  BindPartnerTypes() {
    console.log(this.filterValue);
    this.dataSource.fetchResource(
      this.sort.active,
      this.sort.direction,
      this.filterValue,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  public redirectToDetails = (id: string) => {
    let url: string = `/partnertype/details/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {
    let url: string = `/partnertype/edit/${id}`;
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
        this.partnertypeS.delete(id).subscribe({
          next: () => {
            this.paginator.pageIndex = 0;
            this.BindPartnerTypes();
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
