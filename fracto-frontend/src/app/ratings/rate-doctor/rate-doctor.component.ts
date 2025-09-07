import { Component, Input } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rate-doctor',
  template: `
    <div>
      <mat-form-field>
        <mat-label>Rating</mat-label>
        <mat-select [(ngModel)]="rating">
          <mat-option *ngFor="let r of [1,2,3,4,5]" [value]="r">{{r}}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <textarea matInput placeholder="Comment" [(ngModel)]="comment"></textarea>
      </mat-form-field>
      <button mat-raised-button (click)="submit()">Submit</button>
    </div>
  `
})
export class RateDoctorComponent {
  @Input() doctorId!: number;
  rating = 5;
  comment = '';

  constructor(private ratingService: RatingService, private snack: MatSnackBar) {}

  submit() {
    const userId = Number(localStorage.getItem('userId')) || 0;
    const payload = { doctorId: this.doctorId, userId, rating: this.rating, comment: this.comment };
    this.ratingService.postRating(payload).subscribe(() => {
      this.snack.open('Rating submitted', 'Close', { duration: 2000 });
    }, err => {
      console.error(err);
      this.snack.open('Failed to submit rating', 'Close', { duration: 2000 });
    });
  }
}
