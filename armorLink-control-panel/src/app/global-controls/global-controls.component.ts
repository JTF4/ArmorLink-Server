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

  public fanSpeedChange(speed?: any | undefined | null) {

  }

  public brightnessChange(brightness?: any | undefined | null) {

  }

  public colorChange(color?: any | undefined | null) {

  }
  // Component logic and methods go here
}