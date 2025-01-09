// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { SeatSelectionService } from '../seat.service';

// @Component({
//   selector: 'app-seat-selection',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './seat-selection.component.html',
//   styleUrls: ['./seat-selection.component.css']
// })
// export class SeatSelectionComponent implements OnInit {
// getSeatClass(_t23: { name: string; type: string; status: string; }) {
// throw new Error('Method not implemented.');
// }
//   seatingChart: { rowName: string; seats: { name: string; type: string; status: string }[] }[] = [];
//   selectedSeats: { name: string; type: string; status: string }[] = []; // Store seat objects
//   totalSeats: number = 0;
//   availableSeats: any[] = [
 
//     // Row A
//     { seat: 'A1', type: 'Recliner', status: 'available' },
//     { seat: 'A2', type: 'Prime', status: 'available' },
//     { seat: 'A3', type: 'Classic', status: 'available' },
//     { seat: 'A4', type: 'Prime', status: 'available' },
//     { seat: 'A5', type: 'Recliner', status: 'available' },
  
//     // Row B
//     { seat: 'B1', type: 'Prime', status: 'available' },
//     { seat: 'B2', type: 'Recliner', status: 'available' },
//     { seat: 'B3', type: 'Classic', status: 'available' },
//     { seat: 'B4', type: 'Recliner', status: 'available' },
//     { seat: 'B5', type: 'Prime', status: 'available' },
  
//     // Row C
//     { seat: 'C1', type: 'Prime', status: 'available' },
//     { seat: 'C2', type: 'Classic', status: 'available' },
//     { seat: 'C3', type: 'Recliner', status: 'available' },
//     { seat: 'C4', type: 'Classic', status: 'available' },
//     { seat: 'C5', type: 'Recliner', status: 'available' },
  
//     // Row D
//     { seat: 'D1', type: 'Classic', status: 'available' },
//     { seat: 'D2', type: 'Recliner', status: 'available' },
//     { seat: 'D3', type: 'Prime', status: 'available' },
//     { seat: 'D4', type: 'Recliner', status: 'available' },
//     { seat: 'D5', type: 'Classic', status: 'available' },
  
//     // Row E
//     { seat: 'E1', type: 'Prime', status: 'available' },
//     { seat: 'E2', type: 'Recliner', status: 'available' },
//     { seat: 'E3', type: 'Classic', status: 'available' },
//     { seat: 'E4', type: 'Prime', status: 'available' },
//     { seat: 'E5', type: 'Recliner', status: 'available' },
  
//     // Row F
//     { seat: 'F1', type: 'Recliner', status: 'available' },
//     { seat: 'F2', type: 'Prime', status: 'available' },
//     { seat: 'F3', type: 'Classic', status: 'available' },
//     { seat: 'F4', type: 'Classic', status: 'available' },
//     { seat: 'F5', type: 'Recliner', status: 'available' },
  
//     // Row G
//     { seat: 'G1', type: 'Prime', status: 'available' },
//     { seat: 'G2', type: 'Recliner', status: 'available' },
//     { seat: 'G3', type: 'Classic', status: 'available' },
//     { seat: 'G4', type: 'Recliner', status: 'available' },
//     { seat: 'G5', type: 'Prime', status: 'available' },
  
//     // Row H
//     { seat: 'H1', type: 'Classic', status: 'available' },
//     { seat: 'H2', type: 'Recliner', status: 'available' },
//     { seat: 'H3', type: 'Prime', status: 'available' },
//     { seat: 'H4', type: 'Classic', status: 'available' },
//     { seat: 'H5', type: 'Recliner', status: 'available' },
  
//     // Row I
//     { seat: 'I1', type: 'Prime', status: 'available' },
//     { seat: 'I2', type: 'Recliner', status: 'available' },
//     { seat: 'I3', type: 'Classic', status: 'available' },
//     { seat: 'I4', type: 'Prime', status: 'available' },
//     { seat: 'I5', type: 'Recliner', status: 'available' }
//   ];

//   constructor(private seatService: SeatSelectionService) {}

//   ngOnInit(): void {
//     const seatTypes = ['Recliner', 'Prime', 'Classic'];
//     for (let i = 65; i <= 90; i++) { // ASCII codes for 'A' to 'Z'
//       const rowName = String.fromCharCode(i); // Convert ASCII to letter
//       const seats = [];
//       for (let j = 1; j <= 3; j++) {
//         seats.push({
//           name: `${rowName}${j}`,
//           type: seatTypes[(j - 1) % seatTypes.length],
//           status: 'available'
//         });
//       }
//       this.seatingChart.push({ rowName, seats });
//     }
//     this.loadAvailableSeats(); // Load available seats from the backend (if applicable)
//   }

//   loadAvailableSeats(): void {
//     this.seatService.getAvailableSeats().subscribe(data => {
//       this.availableSeats = data; // Ensure this API returns the list of seats in the correct format
//     });
//   }

//   toggleSeatSelection(seat: { name: string; type: string; status: string }): void {
//     const seatObject = this.findSeat(seat.name);
//     if (seatObject) {
//       if (this.selectedSeats.includes(seatObject)) {
//         this.selectedSeats = this.selectedSeats.filter(s => s !== seatObject); // Deselect
//       } else if (this.selectedSeats.length < this.totalSeats) {
//         this.selectedSeats.push(seatObject); // Select
//       }
//     }
//   }

//   autoSelectSeats(): void {
//     const availableSeats = this.getAvailableSeats();
//     if (availableSeats.length < this.totalSeats) {
//       alert('Not enough available seats.');
//       return;
//     }
//     this.selectedSeats = availableSeats.slice(0, this.totalSeats);
//   }

//   getAvailableSeats(): { name: string; type: string; status: string }[] {
//     return this.seatingChart.flatMap(row => row.seats)
//       .filter(seat => seat.status === 'available' && !this.selectedSeats.includes(seat));
//   }

//   bookSeats(): void {
//     if (this.selectedSeats.length === 0) {
//       alert('Please select at least one seat.');
//       return;
//     }
//     alert(`Booking seats: ${this.selectedSeats.map(s => s.name).join(', ')}`);
//     this.seatingChart.forEach(row => {
//       row.seats.forEach(seat => {
//         if (this.selectedSeats.includes(seat)) {
//           seat.status = 'booked';
//         }
//       });
//     });
//     this.selectedSeats = [];
//   }

//   resetSeats(): void {
//     this.selectedSeats = [];
//   }

//   cancelSelection(): void {
//     if (this.selectedSeats.length === 0) {
//       alert('No seats selected to cancel.');
//       return;
//     }
//     this.selectedSeats.forEach(seat => {
//       const seatObject = this.findSeat(seat.name);
//       if (seatObject) {
//         seatObject.status = 'available';
//       }
//     });
//     this.selectedSeats = [];
//     alert('Seat selection canceled.');
//   }

//   updateSeats(newSeats: { name: string; type: string; status: string }[]): void {
//     if (newSeats.length === 0) {
//       alert('Please select at least one seat to update.');
//       return;
//     }
//     const availableSeats = this.getAvailableSeats();
//     if (newSeats.length > availableSeats.length) {
//       alert('Not enough available seats to complete the update.');
//       return;
//     }

//     // Deselect previous seats
//     this.selectedSeats.forEach(seat => {
//       const seatObject = this.findSeat(seat.name);
//       if (seatObject) {
//         seatObject.status = 'available';
//       }
//     });

//     // Select new seats
//     newSeats.forEach(seat => {
//       const seatObject = this.findSeat(seat.name);
//       if (seatObject) {
//         seatObject.status = 'selected';
//       }
//     });

//     this.selectedSeats = newSeats; // Update selected seats
//     alert('Seat selection updated.');
//   }

//   public findSeat(seatName: string): { name: string; type: string; status: string } | null {
//     for (const row of this.seatingChart) {
//       const seat = row.seats.find(seat => seat.name === seatName);
//       if (seat) {
//         return seat;
//       }
//     }
//     return null;
//   }
// }
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeatSelectionService } from '../seat.service';
import { NavbarComponent } from "../navbar/navbar.component";


@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  
  seatingChart: { rowName: string; seats: { name: string; type: string; status: string }[] }[] = [];
  selectedSeats: { name: string; type: string; status: string }[] = [];
  totalSeats: number = 0;

  constructor(private seatService: SeatSelectionService) {}

  ngOnInit(): void {
    this.initializeSeatingChart();
    this.loadAvailableSeats();
  }

  initializeSeatingChart(): void {
    const seatTypes = ['Recliner', 'Prime', 'Classic'];
    for (let i = 65; i <= 73; i++) { // Rows A to I
      const rowName = String.fromCharCode(i);
      const seats = Array.from({ length: 5 }, (_, j) => ({
        name: `${rowName}${j + 1}`,
        type: seatTypes[j % seatTypes.length],
        status: 'available'
      }));
      this.seatingChart.push({ rowName, seats });
    }
  }

  loadAvailableSeats(): void {
    this.seatService.getAvailableSeats().subscribe(
      (data) => {
        console.log("Data : " , data)
        this.updateSeatingChart(data);
      },
      (error) => console.error('Error loading available seats', error)
    );
  }

  updateSeatingChart(seats: any[]): void {
    seats.forEach(seat => {
      const seatObj = this.findSeat(seat.name);
      if (seatObj) seatObj.status = seat.status;
    });
  }

  getSeatClass(seat: { name: string; type: string; status: string }): string {
    return seat.status === 'booked' ? 'booked' :
           this.selectedSeats.includes(seat) ? 'selected' : 'available';
  }

  toggleSeatSelection(seat: { name: string; type: string; status: string }): void {
    if (seat.status === 'booked') return;

    const index = this.selectedSeats.findIndex(s => s.name === seat.name);
    if (index !== -1) {
      this.selectedSeats.splice(index, 1); // Deselect seat
    } else if (this.selectedSeats.length < this.totalSeats) {
      this.selectedSeats.push(seat); // Select seat
    }
  }

  autoSelectSeats(): void {
    const availableSeats = this.getAvailableSeats();
    if (availableSeats.length < this.totalSeats) {
      alert('Not enough available seats.');
      return;
    }
    this.selectedSeats = availableSeats.slice(0, this.totalSeats);
  }

  getAvailableSeats(): { name: string; type: string; status: string }[] {
    return this.seatingChart.flatMap(row => row.seats).filter(seat => seat.status === 'available');
  }

  bookSeats(): void {
    if (this.selectedSeats.length === 0) {
      alert('No seats selected.');
      return;
    }
    alert(`Booking seats: ${this.selectedSeats.map(s => s.name).join(', ')}`);
    this.selectedSeats.forEach(seat => (seat.status = 'booked'));
    this.selectedSeats = [];
  }

  resetSeats(): void {
    this.selectedSeats = [];
  }

  cancelSelection(): void {
    this.selectedSeats.forEach(seat => (seat.status = 'available'));
    this.selectedSeats = [];
  }

  findSeat(seatName: string): { name: string; type: string; status: string } | null {
    for (const row of this.seatingChart) {
      const seat = row.seats.find(s => s.name === seatName);
      if (seat) return seat;
    }
    return null;
  } 


   bookSeat(seat: any): void {
     this.seatService.bookSeat(seat.id).subscribe(
       (response) => {
         alert(response);
         this.loadAvailableSeats();
       },
       (error) => console.error('Error booking seat', error)
   );
   }
 }

