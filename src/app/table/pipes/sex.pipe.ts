import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 1) {
      return 'Male';
    }
    return 'Female';
  }

}
