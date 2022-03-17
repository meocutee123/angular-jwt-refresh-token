import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

  nvalue : string | undefined

  transform(value: string, ...args: unknown[]): any {
    this.nvalue = value.charAt(0).toUpperCase() + value.slice(1);
    return this.nvalue;

  }

}
