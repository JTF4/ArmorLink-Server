import { Component } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-status-readouts',
  templateUrl: './status-readouts.component.html',
  styleUrls: ['./status-readouts.component.scss'],
  providers: [SocketService]
})
export class StatusReadoutsComponent {

  public helmetTemp: number;
  public o2Sat: number;
  public time;
  public batteryLife: number;

  constructor(private SocketService:SocketService) {

    this.helmetTemp = this.SocketService.getTemperature(0);
    this.o2Sat = this.SocketService.getO2Sat();
    this.time = this.SocketService.getTime();
    this.batteryLife = this.SocketService.getBatteryLife();

  }

  

}
