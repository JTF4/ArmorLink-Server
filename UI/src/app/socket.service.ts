import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { ColorMap } from './_models/ColorMap.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  timeTimeout: any;

  private timeCallback = new Subject<string>(); // Source
  timeCallback$ = this.timeCallback.asObservable(); // Stream

  private colorCallback = new Subject<ColorMap>(); // Source
  colorCallback$ = this.colorCallback.asObservable(); // Stream

  colorMap: ColorMap = {
    bucket: "#f1f1f1",
    chest: "#000000",
    shoulders: {
      left: "#000000",
      right: "#000000"
    },
    forarms: {
      right: "#000000",
      left: "#000000"
    },
    thighs: {
      right: "#000000",
      left: "#000000"
    },
    shins: {
      right: "#000000",
      left: "#000000"
    },
    weapons: [
      { color: "#000000" }
    ]
  }

  constructor() {
    this.startTimeServer()
  } 

  public getTime() {
    let date = new Date();
    let timeString = `${date.getHours()}:${date.getMinutes()}`
    return timeString;
  }

  public getTemperature(componentId: number): number {
    return 10
  }

  public getO2Sat() {
    return 90;
  }

  public getBatteryLife() {
    return 90
  }

  public getColorMap() {
    return this.colorMap;
  }

  

  private startTimeServer() {
    setInterval(() => {
      this.timeCallback.next(this.getTime());
      this.colorCallback.next(this.colorMap);
    }, 1000);
  }
}
