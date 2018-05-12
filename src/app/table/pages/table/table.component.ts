import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/dashboard/services';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  records = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(result => {
      this.records = result;
    });
  }

}
