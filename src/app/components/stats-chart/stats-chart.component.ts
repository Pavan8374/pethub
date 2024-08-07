import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stats-chart',
  standalone: true,
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.css']
})
export class StatsChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    var ctx = document.getElementById('statsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Total Pets', 'Adopted Pets', 'Available for Adoption'],
        datasets: [{
          data: [10, 2, 4],
          backgroundColor: ['#fda085', '#a1c4fd', '#84fab0'],
          hoverBackgroundColor: ['#f6d365', '#c2e9fb', '#8fd3f4']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
