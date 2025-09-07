import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RatingService {
  private apiUrl = `${environment.apiUrl}/ratings`;
  constructor(private http: HttpClient) {}

  postRating(payload: any) {
    return this.http.post(this.apiUrl, payload);
  }

  getRatingsForDoctor(doctorId: number) {
    return this.http.get(`${this.apiUrl}/doctor/${doctorId}`);
  }
}
