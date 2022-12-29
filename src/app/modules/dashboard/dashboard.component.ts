import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ICardSummary } from 'src/app/models/ICardSummary';
import { ChartdataService } from 'src/app/services/chartdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  miniCardData: ICardSummary[];
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 2, rows: 3 },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private chartdataService: ChartdataService) {

  }
  ngOnInit() {
    this.chartdataService.getCardSummaryData().subscribe({
      next: summaryData => {
        this.miniCardData = summaryData;
      }
    });
  }
}
