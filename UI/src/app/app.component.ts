import { Component } from '@angular/core';

import { ArmorViewComponent } from './armor-view/armor-view.component';
import { HeaderComponent } from './header/header.component';
import { GlobalControlsComponent } from './global-controls/global-controls.component';
import { StatusReadoutsComponent } from './status-readouts/status-readouts.component';
import { SocketService } from './socket.service';
import { ColorMap } from './_models/ColorMap.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SocketService]
})
export class AppComponent {
  title = 'armorLink-control-panel';

  //Color Definitions

  bucketColor: string = '#ffffff';
  chestColor: string = '#ffffff';
  shoulderColor: string = '#ffffff';
  forarmsColor: string = '#ffffff';
  thighsColor: string = '#ffffff';
  shinsColor: string = '#ffffff';
  weaponColor: string = '#ffffff';
  atmosphericsColor: string = '#ffffff';
  sfxColor: string = '#ffffff';
  chasesColor: string = '#ffffff';

  colorMap: ColorMap = {
    bucket: "#000000",
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

  constructor(private SocketService:SocketService) {

    /*this.SocketService.colorCallback$.subscribe(data => {
      this.colorMap = data;
      this.updateColors(this.colorMap);
    });*/
  }

  private updateColors(colorMap: ColorMap) {
    this.bucketColor = colorMap.bucket;
    this.chestColor = colorMap.chest;
    this.shoulderColor = colorMap.shoulders.left;
    this.forarmsColor = colorMap.forarms.left;
    this.thighsColor = colorMap.thighs.left;
    this.shinsColor = colorMap.shins.left;
    this.weaponColor = colorMap.weapons[0].color;
  }
}
