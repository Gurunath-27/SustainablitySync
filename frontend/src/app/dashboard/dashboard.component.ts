import { Component, OnInit } from '@angular/core';
import { SustainabilityService, SustainabilityData } from '../shared/services/sustainability.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: SustainabilityData[] = [];
  loading = false;
  error = '';

  constructor(private sustainabilityService: SustainabilityService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = '';
    this.sustainabilityService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      }
    });
  }

  refresh(): void {
    this.loadDashboardData();
  }
}

