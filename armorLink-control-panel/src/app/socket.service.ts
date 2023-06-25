import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() {

  } 

  public getTime() {
    return Date.now();
  }

  public getTemperature(componentId: number): number {
    return 10
  }

  public getO2Sat() {
    return 90;
  }

  public getBatteryLife() {
    return 100
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
}
