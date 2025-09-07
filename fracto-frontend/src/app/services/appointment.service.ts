import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAppointment(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  bookAppointment(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateAppointment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }
    // Expects backend endpoint: GET {apiUrl}/timeslots?doctorId={id}&date={yyyy-MM-dd}
  getTimeSlots(doctorId: number, date: string): Observable<string[]> {
    const qDate = encodeURIComponent(date);
    return this.http.get<string[]>(`${this.apiUrl}/timeslots?doctorId=${doctorId}&date=${qDate}`);
  }

  // in AppointmentService (add near other methods)
getAvailableDates(doctorId: number): Observable<string[]> {
  // Expects backend endpoint: GET {apiUrl}/available-dates?doctorId={id}
  return this.http.get<string[]>(`${this.apiUrl}/available-dates?doctorId=${doctorId}`);
}

}
