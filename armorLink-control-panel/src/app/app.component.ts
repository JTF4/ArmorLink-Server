import { Component } from '@angular/core';

import { ArmorViewComponent } from './armor-view/armor-view.component';
import { HeaderComponent } from './header/header.component';
import { StatusReadoutsComponent } from './status-readouts/status-readouts.component';
import { GlobalControlsComponent } from './global-controls/global-controls.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'armorLink-control-panel';
}
