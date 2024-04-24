import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstructionsComponent } from './instructions/instructions.component';
import { AppDomotiqueComponent } from './app-domotique/app-domotique.component';

const routes: Routes = [
  { path: 'instructions', component: InstructionsComponent },
  { path: '', component: AppDomotiqueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
