import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SocketService } from '../socket.service';

import Debug from 'debug';

@Component({
  selector: 'app-global-controls',
  templateUrl: './global-controls.component.html',
  styleUrls: ['./global-controls.component.scss'],
  providers: [SocketService]
})
export class GlobalControlsComponent {
  
  color: any = "#EC407A";
  brightness: number = 0;

  debug = Debug("GlobalControls");

  constructor(private SocketService:SocketService) {
    
      
  }

  public fanSpeedChange(speed?: any | undefined | null) {

  }

  public brightnessChange(brightness?: any | undefined | null) {
    this.debug(brightness)
  }

  public colorChange(color?: any | undefined | null) {

  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  // Component logic and methods go here
}