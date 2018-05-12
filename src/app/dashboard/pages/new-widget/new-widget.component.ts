import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState, LoadData } from '@app/store';
import { Store } from '@ngrx/store';
import { DataService, AnalysisService } from '../../services';
import { data as fields } from '@app/const/data';
import { color } from '@app/const/color';
import { Router } from '@angular/router';
import { AddChart } from '@app/store/actions';

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

  labels = ['Jan', 'Fed', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  chart = null;

  submited = false;

  get yAxis() { return this.chartForm.get('yAxis'); }

  constructor(
    private router: Router,
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
      title: ['', Validators.required],
      yAxis: ['points', Validators.required]
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

  /**
   * Push new chart to store
   */
  addChart() {
    if (this.chartForm.invalid || this.selectedOutputs.length === 0) {
      this.submited = true;
      return;
    }
    const data = this.chartForm.value;
    data.type = this.chartType;
    data.output = this.output;
    data.fields = this.selectedOutputs;
    this.store.dispatch(new AddChart(data));
    this.router.navigate(['/']);
  }

  /**
   * Handle cancel click
   */
  cancel() {
    this.router.navigate(['/']);
  }

  /**
   * Recreate chart by new type
   * @param type Chart type
   */
  changeType(type: string): void {
    this.chartType = type;
    this.recreateChart();
  }

  /**
   * Handler input change event
   */
  changeInput(e) {
    // this.input = e.target.value;
    this.chart.data.datasets = this.analysisService.parseData(
      this.output,
      this.selectedOutputs,
      this.yAxis.value,
      this.chart.data.datasets.map(item => item.label)
    );
    this.chart.update();
  }

  /**
   * Handlecheckbox change event
   */
  toggleOutput(output, i, text) {
    const data = {
      value: output,
      text: text
    };
    const index = this.selectedOutputs.findIndex(item => item.value === output);
    if (index === -1) {
      this.selectedOutputs.push(data);
      this.pushData(data, i);
    } else {
      this.selectedOutputs.splice(index, 1);
      this.removeData(index, data);
    }
    // this.generateChart();
  }

  private pushData(output, i) {
    /** Get data from API */
    let data: any = this.analysisService.getStatistic(this.output, output.value, this.yAxis.value);
    data = {
      data: data,
      label: output.text,
      fill: false,
      borderColor: color[i],
      backgroundColor: color[i]
    };
    if (this.chartType === 'pie') {
      this.chartData.datasets.push(data);
      this.regeneratePieChat();
    } else {
      this.chart.data.datasets.push(data);
      this.chart.update();
    }
  }

  private removeData(i, output) {
    if (this.chartType === 'pie') {
      this.chartData.datasets.splice(i, 1);
      this.regeneratePieChat();
    } else {
      this.chart.data.datasets = this.chart.data.datasets.filter(item => {
        return item.label !== output.text;
      });
      this.chart.update();
    }
  }

  /**
   * Handler output change
   */
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

    if (this.chart) {
      this.chart.destroy();
    }

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

  isChecked(code) {
    return this.selectedOutputs.findIndex(item => item.value === code) !== -1;
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
