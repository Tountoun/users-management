import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], filterString: string): any {
    const result: any = [];
    if(!values || filterString === ''){
      return values;
    }
    
    values.forEach(
      (value: any)=> {
        // Make the full name of all users
        var fullname = value["firstname"].trim().toLowerCase() + " " + value["lastname"].trim().toLowerCase();
        if(
          fullname.includes(filterString.toLowerCase())
         ){
          result.push(value);
        }
      }
    );
    return result;
  }

}
