import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmorViewComponent } from './armor-view/armor-view.component';
import { RouterModule, Routes } from '@angular/router';
import { GlobalControlsComponent } from './global-controls/global-controls.component';
import { AdvancedControlComponent } from './advanced-control/advanced-control.component';
import { StatusReadoutsComponent } from './status-readouts/status-readouts.component';

const routes: Routes = [
  { path: 'view', component: ArmorViewComponent },
  { path: 'global', component: GlobalControlsComponent},
  { path: 'advanced', component: AdvancedControlComponent},
  { path: 'status', component: StatusReadoutsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }