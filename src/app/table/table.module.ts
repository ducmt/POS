import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './pages/table/table.component';
import { SexPipe } from './pipes/sex.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableComponent, SexPipe]
})
export class TableModule { }
