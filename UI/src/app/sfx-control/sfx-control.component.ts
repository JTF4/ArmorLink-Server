import { Component } from '@angular/core';
import { SocketService } from '../socket.service';

import Debug from 'debug';

@Component({
  selector: 'app-sfx-control',
  templateUrl: './sfx-control.component.html',
  styleUrls: ['./sfx-control.component.scss'],
  providers: [SocketService]
})
export class SfxControlComponent {
  color: any = "#EC407A";
  brightness: number = 0;
  fanSpeed: number = 0;

  debug = Debug("SFXControls");

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
