import { Pipe, PipeTransform } from '@angular/core';
import { ignoreElements } from 'rxjs/operators';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') return value
    const resulPost = [];
    for (const post of value ){
      if (post.category.category.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resulPost.push(post);
      }
    }
    return resulPost;
  }

}
