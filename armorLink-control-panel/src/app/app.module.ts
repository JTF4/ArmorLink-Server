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

@NgModule({
  declarations: [
    AppComponent,
    ArmorViewComponent,
    GlobalControlsComponent,
    StatusReadoutsComponent,
    AdvancedControlComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
