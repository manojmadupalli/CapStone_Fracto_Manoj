// import { Component, OnInit } from '@angular/core';
// import { AppointmentService } from '../../services/appointment.service';
// import { DoctorService } from '../../services/doctor.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-appointment-book',
//   templateUrl: './appointment-book.component.html'
// })
// export class AppointmentBookComponent implements OnInit {
//   doctors: any[] = [];

//   appointment = {
//     doctorId: null as number | null,
//     appointmentDate: '',
//     timeSlot: '',
//     status: 'Pending'
//   };

//   constructor(
//     private appointmentService: AppointmentService,
//     private doctorService: DoctorService,
//     private snackBar: MatSnackBar
//   ) {}
  

//   ngOnInit(): void {
//     this.loadDoctors();
//   }

//   loadDoctors() {
//     this.doctorService.getDoctors().subscribe(res => (this.doctors = res));
//   }

//   book() {
//     this.appointmentService.bookAppointment(this.appointment).subscribe({
//       next: () => {
//         this.snackBar.open(' Appointment booked successfully!', 'Close', { duration: 3000 });
//         this.appointment = { doctorId: null, appointmentDate: '', timeSlot: '', status: 'Pending' };
//       },
//       error: () => {
//         this.snackBar.open(' Booking failed', 'Close', { duration: 3000 });
//       }
//     });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { AppointmentService } from '../../services/appointment.service';
// import { DoctorService } from '../../services/doctor.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-appointment-book',
//   templateUrl: './appointment-book.component.html'
// })
// export class AppointmentBookComponent implements OnInit {
//   doctors: any[] = [];

//   appointment = {
//     doctorId: null as number | null,
//     appointmentDate: '',
//     timeSlot: '',
//     status: 'Pending'
//   };

//   timeSlots: string[] = [];
//   loadingSlots = false;

//   constructor(
//     private appointmentService: AppointmentService,
//     private doctorService: DoctorService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.loadDoctors();
//   }

//   loadDoctors() {
//     this.doctorService.getDoctors().subscribe(res => (this.doctors = res));
//   }

//   /**
//    * Called when doctor or date changes. Tries to fetch available slots from backend.
//    * If backend call fails or isn't implemented, falls back to a local generator.
//    */
//   onDoctorOrDateChange() {
//     this.timeSlots = [];
//     this.appointment.timeSlot = '';

//     const doctorId = this.appointment.doctorId;
//     const date = this.appointment.appointmentDate;

//     if (!doctorId || !date) {
//       // still incomplete selection
//       return;
//     }

//     this.loadingSlots = true;

//     // Try to call backend API. You should implement this method in your AppointmentService:
//     // getTimeSlots(doctorId: number, date: string) -> Observable<string[]>
//     if (this.appointmentService.getTimeSlots) {
//       this.appointmentService.getTimeSlots(doctorId, date).subscribe({
//         next: (slots: string[]) => {
//           this.timeSlots = slots || [];
//           this.loadingSlots = false;

//           // fallback if backend returns empty
//           if (!this.timeSlots.length) {
//             this.timeSlots = this.generateDefaultSlots();
//           }
//         },
//         error: () => {
//           // backend call failed — use a client-side fallback
//           this.loadingSlots = false;
//           this.timeSlots = this.generateDefaultSlots();
//         }
//       });
//     } else {
//       // appointmentService doesn't have getTimeSlots yet — use fallback generator
//       this.loadingSlots = false;
//       this.timeSlots = this.generateDefaultSlots();
//     }
//   }

//   /**
//    * Simple fallback slot generator (30-minute slots between 9:00 and 17:00).
//    * Replace or remove if you will always use server-provided slots.
//    */
//   private generateDefaultSlots(): string[] {
//     const slots: string[] = [];
//     const startMinutes = 9 * 60; // 9:00
//     const endMinutes = 17 * 60; // 17:00
//     const interval = 30; // minutes

//     for (let m = startMinutes; m + interval <= endMinutes; m += interval) {
//       const h1 = Math.floor(m / 60);
//       const min1 = m % 60;
//       const h2 = Math.floor((m + interval) / 60);
//       const min2 = (m + interval) % 60;
//       const slot = `${this.formatTime(h1, min1)} - ${this.formatTime(h2, min2)}`;
//       slots.push(slot);
//     }
//     return slots;
//   }

//   private formatTime(h: number, m: number) {
//     const hh = ((h + 11) % 12) + 1; // 12-hour format
//     const mm = m.toString().padStart(2, '0');
//     const ampm = h < 12 ? 'AM' : 'PM';
//     return `${hh}:${mm} ${ampm}`;
//   }

//   book() {
//     this.appointmentService.bookAppointment(this.appointment).subscribe({
//       next: () => {
//         this.snackBar.open(' Appointment booked successfully!', 'Close', { duration: 3000 });
//         this.appointment = { doctorId: null, appointmentDate: '', timeSlot: '', status: 'Pending' };
//         this.timeSlots = [];
//       },
//       error: () => {
//         this.snackBar.open(' Booking failed', 'Close', { duration: 3000 });
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-book',
  templateUrl: './appointment-book.component.html'
})
export class AppointmentBookComponent implements OnInit {
  doctors: any[] = [];

  // appointment.appointmentDate can be a Date (from mat-datepicker) or string (yyyy-MM-dd)
  appointment: { doctorId: number | null; appointmentDate: any; timeSlot: string; status: string } = {
    doctorId: null,
    appointmentDate: '',
    timeSlot: '',
    status: 'Pending'
  };

  timeSlots: string[] = [];
  loadingSlots = false;

  // date picker helpers
  minDate: Date = new Date(); // prevents past dates
  availableDates: Set<string> | null = null; // yyyy-MM-dd strings, if backend provides them

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (res: any[]) => (this.doctors = res || []),
      error: (err) => {
        console.error('Failed to load doctors', err);
        this.doctors = [];
      }
    });
  }

  // Called when doctor selection changes: clear date/time, and try to fetch available dates
  onDoctorChange() {
    this.appointment.appointmentDate = '';
    this.appointment.timeSlot = '';
    this.timeSlots = [];
    this.availableDates = null;

    const doctorId = this.appointment.doctorId;
    if (!doctorId) return;

    // If AppointmentService exposes getAvailableDates, use it; otherwise allow any future date
    if (this.appointmentService.getAvailableDates) {
      this.appointmentService.getAvailableDates(doctorId).subscribe({
        next: (dates: string[]) => {
          this.availableDates = new Set(dates || []);
        },
        error: (err) => {
          console.warn('getAvailableDates failed or not implemented', err);
          this.availableDates = null;
        }
      });
    } else {
      this.availableDates = null;
    }
  }

  // dateFilter for mat-datepicker: allows only future dates, and if availableDates exists, only those dates
  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    // disallow past days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) return false;

    if (!this.availableDates) return true;

    const iso = this.toIsoDateString(d);
    return this.availableDates.has(iso);
  };

  // Called when either doctor or date changes (wired from template). Ensures both selected and fetches slots.
  onDoctorOrDateChange() {
    // Clear previous time selection and slots
    this.appointment.timeSlot = '';
    this.timeSlots = [];

    const doctorId = this.appointment.doctorId;
    let date = this.appointment.appointmentDate;

    // Normalize Date -> yyyy-MM-dd string if mat-datepicker gives a Date object
    if (date instanceof Date) {
      date = this.toIsoDateString(date);
      // write back the normalized string so other logic expects consistent type
      this.appointment.appointmentDate = date;
    }

    if (!doctorId || !date) {
      // wait for both values
      return;
    }

    this.loadingSlots = true;

    // If AppointmentService provides getTimeSlots(doctorId, date), use it; otherwise fallback generator
    if (this.appointmentService.getTimeSlots) {
      this.appointmentService.getTimeSlots(doctorId, date).subscribe({
        next: (slots: string[]) => {
          this.timeSlots = slots || [];
          this.loadingSlots = false;
          if (!this.timeSlots.length) {
            this.timeSlots = this.generateDefaultSlots();
          }
        },
        error: (err) => {
          console.error('getTimeSlots error', err);
          this.loadingSlots = false;
          this.timeSlots = this.generateDefaultSlots();
        }
      });
    } else {
      // service doesn't implement getTimeSlots -> use client-side fallback
      this.loadingSlots = false;
      this.timeSlots = this.generateDefaultSlots();
    }
  }

  // Book appointment
  book() {
    // ensure appointmentDate is string in yyyy-MM-dd for backend
    let payloadDate = this.appointment.appointmentDate;
    if (payloadDate instanceof Date) {
      payloadDate = this.toIsoDateString(payloadDate);
    }

    const payload = {
      doctorId: this.appointment.doctorId,
      appointmentDate: payloadDate,
      timeSlot: this.appointment.timeSlot,
      status: this.appointment.status
    };

    this.appointmentService.bookAppointment(payload).subscribe({
      next: () => {
        this.snackBar.open('Appointment booked successfully!', 'Close', { duration: 3000 });
        this.appointment = { doctorId: null, appointmentDate: '', timeSlot: '', status: 'Pending' };
        this.timeSlots = [];
        this.availableDates = null;
      },
      error: (err) => {
        console.error('Booking failed', err);
        this.snackBar.open('Booking failed', 'Close', { duration: 3000 });
      }
    });
  }

  // helper: convert Date to yyyy-MM-dd
  private toIsoDateString(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // fallback slot generator: 30-min intervals 09:00 - 17:00
  private generateDefaultSlots(): string[] {
    const slots: string[] = [];
    const start = 9 * 60; // minutes
    const end = 17 * 60;
    const interval = 30;
    for (let m = start; m + interval <= end; m += interval) {
      const h1 = Math.floor(m / 60);
      const min1 = m % 60;
      const h2 = Math.floor((m + interval) / 60);
      const min2 = (m + interval) % 60;
      slots.push(`${this.formatTime(h1, min1)} - ${this.formatTime(h2, min2)}`);
    }
    return slots;
  }

  private formatTime(h: number, m: number) {
    const hh = ((h + 11) % 12) + 1;
    const mm = String(m).padStart(2, '0');
    const ampm = h < 12 ? 'AM' : 'PM';
    return `${hh}:${mm} ${ampm}`;
  }
}

