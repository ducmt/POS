import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dataReducer } from '../store/reducers/data.reducer';
import { StoreModule } from '@ngrx/store';

const reducers = {
  data: dataReducer
};

@NgModule({
  imports: [CommonModule, StoreModule.forRoot(reducers)],
  declarations: [],
  exports: [StoreModule]
})
export class AppStoreModule {}
