import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmorViewComponent } from './armor-view/armor-view.component';
import { RouterModule, Routes } from '@angular/router';
import { GlobalControlsComponent } from './global-controls/global-controls.component';
import { AdvancedControlComponent } from './advanced-control/advanced-control.component';
import { StatusReadoutsComponent } from './status-readouts/status-readouts.component';
import { BucketControlComponent } from './bucket-control/bucket-control.component';
import { ChestControlComponent } from './chest-control/chest-control.component';
import { ShouldersControlComponent } from './shoulders-control/shoulders-control.component';
import { ForarmsControlsComponent } from './forarms-controls/forarms-controls.component';
import { ThighsControlComponent } from './thighs-control/thighs-control.component';
import { ShinsControlComponent } from './shins-control/shins-control.component';
import { WeaponsControlComponent } from './weapons-control/weapons-control.component';
import { AtmosphericsControlComponent } from './atmospherics-control/atmospherics-control.component';
import { SfxControlComponent } from './sfx-control/sfx-control.component';
import { ChasesControlComponent } from './chases-control/chases-control.component';

const routes: Routes = [
  { path: 'view', component: ArmorViewComponent },
  { path: '', component: GlobalControlsComponent},
  { path: 'advanced', component: AdvancedControlComponent},
  { path: 'status', component: StatusReadoutsComponent},
  { path: 'bucket', component: BucketControlComponent},
  { path: 'chest', component: ChestControlComponent},
  { path: 'shoulders', component: ShouldersControlComponent},
  { path: 'forarms', component: ForarmsControlsComponent},
  { path: 'thighs', component: ThighsControlComponent},
  { path: 'shins', component: ShinsControlComponent},
  { path: 'weapons', component: WeaponsControlComponent},
  { path: 'atmospherics', component: AtmosphericsControlComponent},
  { path: 'sfx', component: SfxControlComponent},
  { path: 'chases', component: ChasesControlComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }