import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'seat-selection';
}
