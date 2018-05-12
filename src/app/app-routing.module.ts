import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent, NewWidgetComponent } from './dashboard/pages';
import { TableComponent } from './table/pages';

const ROUTES: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'new-widget', component: NewWidgetComponent },
  { path: 'table', component: TableComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
