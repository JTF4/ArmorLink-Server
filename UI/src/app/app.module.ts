import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ArmorViewComponent } from './armor-view/armor-view.component';
import { GlobalControlsComponent } from './global-controls/global-controls.component';
import { StatusReadoutsComponent } from './status-readouts/status-readouts.component';
import { AdvancedControlComponent } from './advanced-control/advanced-control.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { MatCommonModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { NgxColorsModule } from 'ngx-colors';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider'
import { MatIconModule } from '@angular/material/icon';
import { BucketControlComponent } from './bucket-control/bucket-control.component';
import { ChestControlComponent } from './chest-control/chest-control.component';
import { ShouldersControlComponent } from './shoulders-control/shoulders-control.component';
import { ForarmsControlsComponent } from './forarms-controls/forarms-controls.component';
import { ThighsControlComponent } from './thighs-control/thighs-control.component';
import { ShinsControlComponent } from './shins-control/shins-control.component';
import { WeaponsControlComponent } from './weapons-control/weapons-control.component';
import { AtmosphericsControlComponent } from './atmospherics-control/atmospherics-control.component';
import { SfxControlComponent } from './sfx-control/sfx-control.component';
import { ChasesControlComponent } from './chases-control/chases-control.component'

@NgModule({
  declarations: [
    AppComponent,
    ArmorViewComponent,
    GlobalControlsComponent,
    StatusReadoutsComponent,
    AdvancedControlComponent,
    HeaderComponent,
    BucketControlComponent,
    ChestControlComponent,
    ShouldersControlComponent,
    ForarmsControlsComponent,
    ThighsControlComponent,
    ShinsControlComponent,
    WeaponsControlComponent,
    AtmosphericsControlComponent,
    SfxControlComponent,
    ChasesControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCommonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    NgxColorsModule,
    FormsModule,
    MatSliderModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
