import { Component } from '@angular/core';
import { SocketService } from '../socket.service';

import Debug from 'debug';

@Component({
  selector: 'app-bucket-control',
  templateUrl: './bucket-control.component.html',
  styleUrls: ['./bucket-control.component.scss'],
  providers: [SocketService]
})
export class BucketControlComponent {
  color: any = "#EC407A";
  brightness: number = 0;
  fanSpeed: number = 0;

  debug = Debug('HelmetControl')

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
  // Component logic and methods go here
}
