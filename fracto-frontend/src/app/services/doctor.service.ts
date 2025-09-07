import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) {}

  getDoctors(params?: { city?: string; specializationId?: number | null; minRating?: number | null }): Observable<any[]> {
    let httpParams = new HttpParams();
    if (params?.city) httpParams = httpParams.set('city', params.city);
    if (params?.specializationId != null) httpParams = httpParams.set('specializationId', params.specializationId.toString());
    if (params?.minRating != null) httpParams = httpParams.set('minRating', params.minRating.toString());
    return this.http.get<any[]>(this.apiUrl, { params: httpParams });
  
  }

  addDoctor(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  searchDoctors(city?: string, specializationId?: number, minRating?: number) {
  let params: any = {};
  if (city) params.city = city;
  if (specializationId) params.specializationId = specializationId;
  if (minRating) params.minRating = minRating;

  return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
}


  updateDoctor(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteDoctor(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
