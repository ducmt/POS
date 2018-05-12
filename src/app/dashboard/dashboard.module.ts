import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DataService, AnalysisService } from './services';
import { NewWidgetComponent } from './pages/new-widget/new-widget.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [DashboardComponent, NewWidgetComponent],
  providers: [DataService, AnalysisService]
})
export class DashboardModule {}
