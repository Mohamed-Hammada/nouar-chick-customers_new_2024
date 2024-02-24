import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import Chart from 'chart.js/auto';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.loadCustomerChart();
    this.loadProductChart();
    this.loadStatementHistoryChart();
  }

  loadCustomerChart(): void {
    this.analyticsService.getFinancialTransactionCountPerCustomer().subscribe((data: any[]) => {
      const transactions = data.sort((a, b) => b.count - a.count).slice(0, 10);

      const names = transactions.map(item => item[0]);
      const counts = transactions.map(item => item[1]);

      new Chart('customerChart', {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            label: 'Number of Financial Transactions Per Customer',
            data: counts,
            backgroundColor: this.poolColors(names.length),
            borderColor:this.poolColors(names.length),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }


  loadProductChart(): void {
    this.analyticsService.getFinancialTransactionCountPerProduct().subscribe((data: any[]) => {
      const transactions = data.sort((a, b) => b.count - a.count).slice(0, 10);

      const names = transactions.map(item => item[0]);
      const counts = transactions.map(item => item[1]);


      new Chart('productChart', {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            label: 'Number of Financial Transactions Per Product',
            data: counts,
            backgroundColor: this.poolColors(names.length),
            borderColor: this.poolColors(names.length),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  loadStatementHistoryChart(): void {
    this.analyticsService.getFinancialTransactionCountPerStatementHistory().subscribe((data: any[]) => {
      const transactions = data.sort((a, b) => b.count - a.count).slice(0, 10);

      const names = transactions.map(item => item[0]);
      const counts = transactions.map(item => item[1]);


      new Chart('statementHistoryChart', {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            label: 'Number of Financial Transactions Per Statement History',
            data: counts,
            backgroundColor: this.poolColors(names.length),
            borderColor: this.poolColors(names.length),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  dynamicColors() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.5)";
  }

  poolColors(a: number) {
    const pool = [];
    for (let i = 0; i < a; i++) {
      pool.push(this.dynamicColors());
    }
    return pool;
  }

  openPopup(chartId: string): void {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    const imageUrl = canvas.toDataURL(); // Convert canvas to data URL
    // Open popup dialog with the image URL
    // You can use any popup dialog library or implement your custom dialog
    // Example: open a new browser window with the image
    window.open(imageUrl, '_blank', 'location=yes,height=800,width=800,scrollbars=yes,status=yes');
}


}
