import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmorViewComponent } from './armor-view/armor-view.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'view', component: ArmorViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }