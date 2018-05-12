import { Injectable } from '@angular/core';
import { AppState } from '@app/store';
import { Store } from '@ngrx/store';
import { color } from '@app/const/color';
import * as moment from 'moment';

@Injectable()
export class AnalysisService {

  data = [];

  labels = {
    weeks: [],
    month: []
  };

  constructor(private store: Store<AppState>) {
    this.store.select('data').subscribe(result => {
      this.data = result;
    });
    this.getLabels();
  }

  getOutput(output) {
    if (output) {
      return this.data.filter((value, index, a) => {
        return a.findIndex(item => item[output] === value[output]) === index;
      });
    }
    return [];
  }

  parseData(output, fields, input, chartTexts) {
    let exportData: any = {};
    for (const field of fields) {
      exportData[field.value] = new Array(12).fill(0);
    }

    for (const item of this.data) {
      if (
        fields.findIndex(field => field.value === item[output]) !== -1
        && item.transactionDate
      ) {
        const month = new Date(item.transactionDate).getMonth();
        exportData[item[output]][month] += item[input];
      }
    }
    exportData = Object.keys(exportData).map((key) => {
      return { data: exportData[key] };
    });

    for (let i = 0; i < chartTexts.length; i ++) {
      exportData[i].label = chartTexts[i];
      exportData[i].borderColor = color[i];
      exportData[i].backgroundColor = color[i];
      exportData[i].fill = false;
    }

    return exportData;
  }

  getDatasets(input, output, fields) {
    const datasets = {};
    for (let i = 0; i < fields.length; i++) {
      const item: any = {
        label: fields[i].text,
        fill: false,
        backgroundColor: color[i],
        borderColor: color[i],
        data: new Array(12).fill(0)
      };
      datasets[fields[i].value] = item;
    }

    for (const item of this.data) {
      if (
        fields.findIndex(field => field.value === item[output]) !== -1
        && item.transactionDate
      ) {
        const month = new Date(item.transactionDate).getMonth();
        datasets[item[output]].data[month] += item[input];
      }
    }

    return Object.keys(datasets).map(key => {
      return datasets[key];
    });
  }

  getStatistic(output, field, input) {
    const exportData = new Array(12).fill(0);
    for (const item of this.data) {
      if (item[output] === field && item.transactionDate) {
        const month = new Date(item.transactionDate).getMonth();
        exportData[month] += item[input];
      }
    }

    return exportData;
  }

  getWeekData(output, field, input) {
    const firstOfWeek = moment(this.labels.weeks[0], 'YYYY-MM-DD');
    const exportData = new Array(this.labels.weeks.length).fill(0);
    for (const item of this.data) {
      if (
        item[output] === field
        && item.transactionDate
        && this.labels.weeks.indexOf(item.transactionDate) !== -1
      ) {
        const day = moment(item.transactionDate, 'YYYY-MM-DD');
        exportData[day.diff(firstOfWeek, 'days')] += item[input];
      }
    }

    return exportData;
  }

  getWeekDatas(input, output, fields) {
    const firstOfWeek = moment(this.labels.weeks[0], 'YYYY-MM-DD');
    const datasets = {};
    for (let i = 0; i < fields.length; i++) {
      const item: any = {
        label: fields[i].text,
        fill: false,
        backgroundColor: color[i],
        borderColor: color[i],
        data: new Array(this.labels.weeks.length).fill(0)
      };
      datasets[fields[i].value] = item;
    }

    for (const item of this.data) {
      if (
        fields.findIndex(field => field.value === item[output]) !== -1 &&
        item.transactionDate
        && this.labels.weeks.indexOf(item.transactionDate) !== -1
      ) {
        const day = moment(item.transactionDate, 'YYYY-MM-DD');
        datasets[item[output]].data[day.diff(firstOfWeek, 'days')] += item[input];
      }
    }

    return Object.keys(datasets).map(key => {
      return datasets[key];
    });
  }

  reloadWeekDataByInput(output, fields, input, chartTexts) {
    const firstOfWeek = moment(this.labels.weeks[0], 'YYYY-MM-DD');
    let exportData: any = {};
    for (const field of fields) {
      exportData[field.value] = new Array(this.labels.weeks.length).fill(0);
    }

    for (const item of this.data) {
      if (
        fields.findIndex(field => field.value === item[output]) !== -1
        && item.transactionDate
        && this.labels.weeks.indexOf(item.transactionDate) !== -1
      ) {
        const day = moment(item.transactionDate, 'YYYY-MM-DD');
        exportData[item[output]][day.diff(firstOfWeek, 'days')] += item[input];
      }
    }
    exportData = Object.keys(exportData).map((key) => {
      return { data: exportData[key] };
    });

    for (let i = 0; i < chartTexts.length; i ++) {
      exportData[i].label = chartTexts[i];
      exportData[i].borderColor = color[i];
      exportData[i].backgroundColor = color[i];
      exportData[i].fill = false;
    }

    return exportData;
  }

  // getWeekStatistic(output, field, input) {
  //   const firstOfWeek = moment(this.labels.weeks[0], 'YYYY-MM-DD');
  //   const exportData = new Array(this.labels.weeks.length).fill(0);
  //   for (const item of this.data) {
  //     if (item[output] === field && item.transactionDate) {
  //       const day = moment(item.transactionDate, 'YYYY-MM-DD');
  //       exportData[day.diff(firstOfWeek, 'days')] += item[input];
  //     }
  //   }

  //   return exportData;
  // }

  getLabels() {
    const now = moment();
    for (let i = 0; i < 7; i++) {
      now.add(-1, 'day');
      this.labels.weeks.unshift(now.format('YYYY-MM-DD'));
    }
  }
}
