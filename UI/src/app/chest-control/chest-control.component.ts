import { Component } from '@angular/core';
import { SocketService } from '../socket.service';

import Debug from 'debug';

@Component({
  selector: 'app-chest-control',
  templateUrl: './chest-control.component.html',
  styleUrls: ['./chest-control.component.scss'],
  providers: [SocketService]
})
export class ChestControlComponent {
  color: any = "#EC407A";
  brightness: number = 0;
  fanSpeed: number = 0;

  debug = Debug("ChestControl");

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
    this.brightness = value
    return `${value}`;
  }
}
