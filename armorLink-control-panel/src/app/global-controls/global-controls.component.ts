import { Component, Output, EventEmitter } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-global-controls',
  templateUrl: './global-controls.component.html',
  styleUrls: ['./global-controls.component.scss'],
  providers: [SocketService]
})
export class GlobalControlsComponent {
  
  constructor(private SocketService:SocketService) {
    
  }
  // Component logic and methods go here
}