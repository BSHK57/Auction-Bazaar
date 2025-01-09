import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

// Register all chart.js elements (e.g., bar chart, line chart, etc.)
Chart.register(...registerables);

@Component({
  selector: 'app-user-auction-chart',
  standalone: true,
  templateUrl: './user-auction-chart.component.html',
  styleUrls: ['./user-auction-chart.component.css'],
})
export class UserAuctionChartComponent implements OnInit {
  ngOnInit() {
    // Data for the chart
    const chartData = {
      labels: ['User 1', 'User 2', 'User 3', 'User 4'], // User names
      datasets: [
        {
          label: 'Number of Auctions', // Chart label
          data: [12, 19, 3, 5], // Number of auctions per user
          backgroundColor: 'rgba(0, 123, 255, 0.5)', // Bar color
          borderColor: 'rgba(0, 123, 255, 1)', // Bar border color
          borderWidth: 1,
        },
      ],
    };

    // Chart options
    const chartOptions = {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Users',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Number of Auctions',
          },
          beginAtZero: true, // Start Y-axis at zero
        },
      },
    };

    // Initialize the chart
    new Chart('auctionChart', {
      type: 'bar', // Type of chart (bar chart)
      data: chartData, // Data for the chart
      options: chartOptions, // Options for the chart
    });
  }
}
