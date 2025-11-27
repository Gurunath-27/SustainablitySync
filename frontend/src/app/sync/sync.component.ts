import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SustainabilityService, SyncResponse } from '../shared/services/sustainability.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent {
  syncing = false;
  syncResult: SyncResponse | null = null;
  error = '';

  constructor(
    private sustainabilityService: SustainabilityService,
    private router: Router
  ) {}

  syncData(): void {
    this.syncing = true;
    this.error = '';
    this.syncResult = null;

    this.sustainabilityService.syncData().subscribe({
      next: (response) => {
        this.syncResult = response;
        this.syncing = false;
      },
      error: (err) => {
        this.error = 'Failed to sync data. Please try again.';
        this.syncing = false;
      }
    });
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}

