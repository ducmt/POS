import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dataReducer, chartReducer } from '../store/reducers';
import { StoreModule } from '@ngrx/store';

const reducers = {
  data: dataReducer,
  charts: chartReducer
};

@NgModule({
  imports: [CommonModule, StoreModule.forRoot(reducers)],
  declarations: [],
  exports: [StoreModule]
})
export class AppStoreModule {}
