import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService, AnalysisService } from '../../services';
import { AppState } from '@app/store/models';
import { Store } from '@ngrx/store';
import { LoadData } from '@app/store/actions';
import { barChartData } from '@app/const/sample-chart';
import { color } from '@app/const/color';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  charts = [];

  chartObjects = [];

  labels = ['Jan', 'Fed', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(
    private dataService: DataService,
    private store: Store<AppState>,
    private analysisService: AnalysisService
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      if (data.length === 0) {
        this.dataService.getData().subscribe(result => {
          if (result.length > 0) {
            this.store.dispatch(new LoadData(result));
          }
        });
      }
    });

    this.store.select('charts').subscribe(charts => {
      this.charts = charts;
    });
  }

  ngAfterViewInit() {
    if (this.charts.length === 0) {
      drawChart('chart-sample', {
        type: 'bar',
        data: barChartData
      });
    }

    for (let i = 0; i < this.charts.length; i++) {
      const datasets = this.analysisService.getDatasets(
        this.charts[i].yAxis,
        this.charts[i].output,
        this.charts[i].fields
      );

      if (this.charts[i].type === 'pie') {
        const labels = [];
        const data = [];
        for (let index = 0; index < datasets.length; index++) {
          labels.push(datasets[index].label);
          data.push(
            datasets[index].data.reduce((a, b) => {
              return a + b;
            }, 0)
          );
          this.chartObjects[i] = drawChart('chart-' + i, {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [{
                data: data,
                backgroundColor: color
              }],
            }
          });
        }
      } else {
        this.chartObjects[i] = drawChart('chart-' + i, {
          type: this.charts[i].type,
          data: {
            labels: this.labels,
            datasets: datasets
          }
        });
      }
    }
  }
}
