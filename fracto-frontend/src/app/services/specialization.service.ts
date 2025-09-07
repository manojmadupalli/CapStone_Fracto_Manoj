import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpecializationService {
  private apiUrl = `${environment.apiUrl}/specializations`;

  constructor(private http: HttpClient) {}

  getSpecializations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSpecialization(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addSpecialization(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateSpecialization(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteSpecialization(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
