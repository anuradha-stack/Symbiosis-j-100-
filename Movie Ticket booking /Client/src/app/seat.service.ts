// src/app/services/seat-selection.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatSelectionService {
  private apiUrl = 'http://localhost:4545/api/seats';

  constructor(private http: HttpClient) {}

  getAvailableSeats(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  bookSeat(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/book/${id}`, {});
  }

  cancelSeat(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancel/${id}`, {});
  }

  autoSelectSeats(totalSeats: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/autoSelect`, totalSeats);
  }

  updateSeat(id: number, seat: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, seat);
  }

  deleteSeat(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
