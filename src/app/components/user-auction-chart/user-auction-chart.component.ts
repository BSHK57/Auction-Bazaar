import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MockDataService } from '../../mock-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-user-auction-chart',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './user-auction-chart.component.html',
  styleUrls: ['./user-auction-chart.component.css'],
})
export class UserAuctionChartComponent implements OnInit {
  // ngOnInit() {
  //   // Data for the chart
  //   const chartData = {
  //     labels: ['User 1', 'User 2', 'User 3', 'User 4'],
  //     datasets: [
  //       {
  //         label: 'Number of Auctions', 
  //         data: [12, 19, 3, 5], 
  //         backgroundColor: 'rgba(0, 123, 255, 0.5)', 
  //         borderColor: 'rgba(0, 123, 255, 1)', 
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  //   const chartOptions = {
  //     responsive: true,
  //     scales: {
  //       x: {
  //         title: {
  //           display: true,
  //           text: 'Users',
  //         },
  //       },
  //       y: {
  //         title: {
  //           display: true,
  //           text: 'Number of Auctions',
  //         },
  //         beginAtZero: true, 
  //       },
  //     },
  //   };
  //   new Chart('auctionChart', {
  //     type: 'bar',
  //     data: chartData, 
  //     options: chartOptions, 
  //   });
  // }
  auctionLabels: string[] = [];
  auctionChartData: any[] = [];

  userBehaviorLabels: string[] = [];
  userBehaviorChartData: any[] = [];

  financialLabels: string[] = [];
  financialChartData: any[] = [];
  activeTab: string = 'auctions'; // Default active tab
  

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    const auctionData = {
      labels: ['User 1', 'User 2', 'User 3', 'User 4'],
      datasets: [
        {
          label: 'Number of Auctions',
          data: [12, 19, 3, 5],
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
    const auctionOptions = {
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
          beginAtZero: true,
        },
      },
    };
    new Chart('auctionChart', {
      type: 'bar',
      data: auctionData,
      options: auctionOptions,
    });

    // User Behavior Insights
    const userBehaviorData = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Active Users',
          data: [20, 30, 25, 35, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Avg Bids per Auction',
          data: [2, 3, 4, 3.5, 4.2],
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: false,
          tension: 0.1,
        },
      ],
    };
    const userBehaviorOptions = {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Count',
          },
          beginAtZero: true,
        },
      },
    };
    new Chart('userBehaviorChart', {
      type: 'line',
      data: userBehaviorData,
      options: userBehaviorOptions,
    });

    // Financial Metrics
    const financialData = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Revenue ($)',
          data: [500, 700, 800, 900, 1200],
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Avg Bid Value ($)',
          data: [25, 28, 32, 30, 34],
          borderColor: 'rgba(153, 102, 255, 1)',
          fill: false,
          tension: 0.1,
        },
      ],
    };
    const financialOptions = {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Amount ($)',
          },
          beginAtZero: true,
        },
      },
    };
    new Chart('financialChart', {
      type: 'line',
      data: financialData,
      options: financialOptions,
    });
  }
  setActiveTab(tab: string): void {
    
    this.activeTab = tab;
  }

}
