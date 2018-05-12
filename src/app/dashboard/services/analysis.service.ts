import { Injectable } from '@angular/core';
import { AppState } from '@app/store';
import { Store } from '@ngrx/store';
import { color } from '@app/const/color';

@Injectable()
export class AnalysisService {

  data = [];

  constructor(private store: Store<AppState>) {
    this.store.select('data').subscribe(result => {
      this.data = result;
    });
  }

  getOutput(output) {
    return this.data.filter((value, index, a) => {
      return a.findIndex(item => item[output] === value[output]) === index;
    });
  }

  parseData(output, fields, input, chartTexts) {
    let exportData: any = {};
    for (const field of fields) {
      exportData[field] = new Array(12).fill(0);
    }

    for (const item of this.data) {
      if (fields.indexOf(item[output]) !== -1 && item.transactionDate) {
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
}
