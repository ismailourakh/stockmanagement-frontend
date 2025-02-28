import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.css'
})
export class StatistiqueComponent implements AfterViewInit {
  selectedStatType: string = 'stock_entree';
  startDate: string = '';
  endDate: string = '';

  ngAfterViewInit(): void {
    this.renderCharts();
  }

  renderCharts(): void {
    this.createBarChart();
    this.createLineChart();
    this.createPieChart();
  }

  createBarChart(): void {
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],
        datasets: [{ label: 'Stock Entré', data: [10, 20, 15, 25, 30], backgroundColor: 'rgba(54, 162, 235, 0.6)' }]
      }
    });
  }

  createLineChart(): void {
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],
        datasets: [{ label: 'Stock Sortie', data: [5, 15, 10, 20, 25], borderColor: 'rgba(255, 99, 132, 1)', fill: false }]
      }
    });
  }

  createPieChart(): void {
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Produit A', 'Produit B', 'Produit C'],
        datasets: [{ data: [40, 30, 30], backgroundColor: ['red', 'blue', 'green'] }]
      }
    });
  }
}
