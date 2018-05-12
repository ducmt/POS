import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppState, LoadData } from '@app/store';
import { Store } from '@ngrx/store';
import { DataService, AnalysisService } from '../../services';
import { data as fields } from '@app/const/data';
import { color } from '@app/const/color';

@Component({
  selector: 'app-new-widget',
  templateUrl: './new-widget.component.html',
  styleUrls: ['./new-widget.component.scss']
})
export class NewWidgetComponent implements OnInit {
  chartType = 'line';

  chartForm: FormGroup;

  chartData: any = {};

  output = '';

  selectedOutputIndex = -1;

  outputs = [];

  selectedOutputs = [];

  outputText = '';

  input = 'points';

  labels = ['Jan', 'Fed', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  chart = null;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private dataService: DataService,
    private analysisService: AnalysisService
  ) {}

  ngOnInit() {
    this.store.select('data').subscribe(data => {
      if (data.length === 0) {
        this.dataService.getData().subscribe(result => {
          if (result.length > 0) {
            this.store.dispatch(new LoadData(result));
          }
        });
      }
    });
    this.chartForm = this.fb.group({
      title: '',
      yAxis: ''
    });

    this.chart = drawChart('chart', {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets: []
      },
      options: this.chartOptions
    });
  }

  changeType(type: string): void {
    this.chartType = type;
    this.recreateChart();
  }

  changeInput(e) {
    this.input = e.target.value;
    this.chart.data.datasets = this.analysisService.parseData(
      this.output,
      this.selectedOutputs,
      this.input,
      this.chart.data.datasets.map(item => item.label)
    );
    this.chart.update();
  }

  toggleOutput(output, i) {
    const index = this.selectedOutputs.indexOf(output);
    if (index === -1) {
      this.selectedOutputs.push(output);
      this.pushData(output, i);
    } else {
      this.selectedOutputs.splice(index, 1);
      this.removeData(index);
    }
    // this.generateChart();
  }

  private pushData(output, i) {
    if (this.chartType === 'pie') {
      let data: any = this.analysisService.getStatistic(this.output, output, this.input);
      data = {
        data: data,
        label: this.outputs[i][fields[this.output]],
        fill: false,
        borderColor: color[i],
        backgroundColor: color[i]
      };
      this.chartData.datasets.push(data);
      this.regeneratePieChat();
    } else {
      let data: any = this.analysisService.getStatistic(this.output, output, this.input);
      data = {
        data: data,
        label: this.outputs[i][fields[this.output]],
        fill: false,
        borderColor: color[i],
        backgroundColor: color[i]
      };
      this.chart.data.datasets.push(data);
      this.chart.update();
    }
  }

  private removeData(i) {
    if (this.chartType === 'pie') {
      this.chartData.datasets.splice(i, 1);
      this.regeneratePieChat();
    } else {
      this.chart.data.datasets = this.chart.data.datasets.filter(item => {
        return item.label !== this.outputs[i][fields[this.output]];
      });
      this.chart.update();
    }
  }

  changeOutput(e) {
    this.output = e.target.value;
    this.outputs = this.analysisService.getOutput(this.output);
    this.outputText = fields[this.output];
    this.selectedOutputs = [];
    this.chart.data.datasets = [];
  }

  get title() {
    return this.chartForm.get('title');
  }

  private recreateChart() {
    if (this.chartType === 'pie') {
      this.createPieChart();
    } else {
      this.createOtherChart();
    }
  }

  private createPieChart() {
    this.chartData = this.chart.data;
    const data = this.chart.data.datasets.map(item => {
      return item.data.reduce((a, b) => a + b, 0);
    });
    const labels = this.chart.data.datasets.map(item => item.label);
    const colors = [];

    this.chart = drawChart('chart', {
      type: this.chartType,
      data: {
        labels: labels,
        datasets: [
          { data: data, backgroundColor: color }
        ]
      }
    });
  }

  private regeneratePieChat() {
    const data = this.chartData.datasets.map(item => {
      return item.data.reduce((a, b) => a + b, 0);
    });
    const labels = this.chartData.datasets.map(item => item.label);
    this.chart.data.labels = labels;
    this.chart.data.datasets[0] = { data: data, backgroundColor: color };
    this.chart.update();
  }

  private createOtherChart() {
    this.chart.destroy();
    if (this.chart.config.type === 'pie') {
      this.chart = drawChart('chart', {
        type: this.chartType,
        data: this.chartData,
        options: this.chartOptions
      });
    } else {
      const oldData = this.chart.data;
      this.chart = drawChart('chart', {
        type: this.chartType,
        data: oldData,
        options: this.chartOptions
      });
    }
  }

  get chartOptions() {
    return {
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            beginAtZero: true
          },
        }],
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true
          },
        }]
      },
    };
  }
}
