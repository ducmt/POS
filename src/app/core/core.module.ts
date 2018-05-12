import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [HttpModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class CoreModule {}
