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

  public batteryLevel: number;

  constructor(private SocketService:SocketService) {

    this.helmetTemp = this.SocketService.getTemperature(0);
    this.o2Sat = this.SocketService.getO2Sat();
    this.time = this.SocketService.getTime();
    this.batteryLife = this.SocketService.getBatteryLife();

    this.batteryLevel = this.getBatteryLevel(this.batteryLife);

  }

  ngOnInit() {
    this.SocketService.timeCallback$.subscribe(data => this.time = data);
  }

  private getBatteryLevel(batteryLife: number): number {
    if(batteryLife <= 10) return 1
    else if (batteryLife <= 20) return 2
    else if (batteryLife <= 30) return 3
    else if (batteryLife <= 40) return 4
    else if (batteryLife <= 50) return 5
    else if (batteryLife <= 60) return 6
    else if (batteryLife <= 70) return 7
    else if (batteryLife <= 80) return 8
    else if (batteryLife <= 90) return 9
    else if (batteryLife <= 100) return 10
    else if (batteryLife = 0) return 0
    else return 0
  }

  

}
