import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SustainabilityData {
  metric: string;
  value_tonnes: number;
  source_count: number;
  timestamp: string;
  sources: string[];
}

export interface SyncResponse {
  success: boolean;
  message: string;
  data: SustainabilityData;
}

@Injectable({
  providedIn: 'root'
})
export class SustainabilityService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  syncData(): Observable<SyncResponse> {
    return this.http.post<SyncResponse>(`${this.apiUrl}/sync`, {});
  }

  getDashboardData(): Observable<SustainabilityData[]> {
    return this.http.get<SustainabilityData[]>(`${this.apiUrl}/data`);
  }

  getLatestData(): Observable<SustainabilityData> {
    return this.http.get<SustainabilityData>(`${this.apiUrl}/data/latest`);
  }
}

