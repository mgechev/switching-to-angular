import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Pipe({
  name: 'fetchJson',
  pure: false
})
export class FetchJsonPipe implements PipeTransform {
  private data: any;
  private prevUrl: string;
  constructor(private http: HttpClient) { }
  transform(url: string): any {
    if (this.prevUrl !== url) {
      this.http.get(url)
        .toPromise()
        .then(result => this.data = result);
      this.prevUrl = url;
    }
    return this.data || {};
  }
}
