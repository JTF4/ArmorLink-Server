import { Component } from '@angular/core';

import { ArmorViewComponent } from './armor-view/armor-view.component';
import { HeaderComponent } from './header/header.component';
import { GlobalControlsComponent } from './global-controls/global-controls.component';
import { StatusReadoutsComponent } from './status-readouts/status-readouts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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

  constructor() {

  }


}
