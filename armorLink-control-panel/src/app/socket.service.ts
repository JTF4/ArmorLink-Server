import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  timeTimeout: any;

  private timeCallback = new Subject<string>(); // Source
  timeCallback$ = this.timeCallback.asObservable(); // Stream

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
    let testMap = {
      1: {
        r: 255,
        g: 255,
        b: 255
      },
      2: {
        r: 255,
        g: 255,
        b: 255
      },
      3: {
        r: 255,
        g: 255,
        b: 255
      },
      4: {
        r: 255,
        g: 255,
        b: 255
      }
    }

    return testMap
  }

  

  private startTimeServer() {
    setInterval(() => {
      this.timeCallback.next(this.getTime())
    }, 1000);
  }
}
