import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent, NewWidgetComponent } from './dashboard/pages';

const ROUTES: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'new-widget', component: NewWidgetComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
