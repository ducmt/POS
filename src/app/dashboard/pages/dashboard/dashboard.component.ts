import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(result => console.log(result));
  }

  ngAfterViewInit() {
    const data = {
      bindto: '#chart',
      data: {
        columns: [
          ['Hihi', 30, 200, 100, 400, 150, 250],
          ['Haha', 50, 20, 10, 40, 15, 25]
        ],
      },
    };
    // generateC3(data);
  }
}
