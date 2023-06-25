import { Component, Input } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-advanced-control',
  templateUrl: './advanced-control.component.html',
  styleUrls: ['./advanced-control.component.scss'],
  providers: [SocketService]
})
export class AdvancedControlComponent {
  
  constructor(private SocketService:SocketService) {
    
  }

  // Component logic and methods go here
}

interface Pixel {
  color: string;
  brightness: number;
  fanSpeed: string;
  hasFan: boolean;
}