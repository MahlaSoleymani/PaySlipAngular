import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  baseUrl = '';
  constructor(private http: HttpClient) { }

  public get(route: string, id: any = null, options: any = undefined): Observable<any> {
    if (id === undefined || id === null) {
      return this.http.get(this.generateUrl(route));
    }
    return this.http.get(this.generateUrl(route) + '/' + id, options);
  }

  public post(route: string, body: any): Observable<any> {
    return this.http.post(this.generateUrl(route), JSON.stringify(body), this.generateHeaders());
  }

  // public update(route: string, id: any, body: any): Observable<any> {
  //   return this.http.put(this.generateUrl(route) + '/' + id, body, this.generateHeaders());
  // }

  public update(route: string, body: any, id: any = null): Observable<any> {
    if (id === undefined || id === null) {
      return this.http.put(this.generateUrl(route), body, this.generateHeaders());
    }
    return this.http.put(this.generateUrl(route) + '/' + id, body, this.generateHeaders());
  }

  public updateById(route: string, id: any = null): Observable<any> {
    if (id === undefined || id === null) {
      return this.http.put(this.generateUrl(route), this.generateHeaders());
    }
    return this.http.put(this.generateUrl(route) + '/' + id, this.generateHeaders());
  }

  public delete(route: string, id: any): Observable<any> {
    return this.http.delete(this.generateUrl(route) + '/' + id);
  }

  generateUrl(url: string): string {
    if (url.startsWith('/')) {
      return environment.serverUrl + this.baseUrl + url;
    }
    return environment.serverUrl + this.baseUrl + '/' + url;

  }


  public generatePaginateion(
    index: any, count: any,
    sort: any = undefined,
    order: any = undefined,
    nameFilter: any = undefined, filter: any = undefined,
    nameFilter2: any = undefined, filter2: any = undefined,
    nameFilter3: any = undefined, filter3: any = undefined,
    nameFilter4: any = undefined, filter4: any = undefined,
    nameFilter5: any = undefined, filter5: any = undefined
  ) {
    let stringUrl = '?Count=' + count + '&Index=' + index;
    if (sort != undefined && sort != null) {
      stringUrl = stringUrl + '&' + 'Sort=' + sort;
    }

    if (order != undefined && order != null) {
      stringUrl = stringUrl + '&' + 'Order=' + order;
    }

    if (filter != undefined && filter != null) {
      stringUrl = (stringUrl + '&' + nameFilter + '=' + filter);
    }

    if (filter2 != undefined && filter2 != null) {
      stringUrl = (stringUrl + '&' + nameFilter2 + '=' + filter2);
    }

    if (filter3 != undefined && filter3 != null) {
      stringUrl = (stringUrl + '&' + nameFilter3 + '=' + filter3);
    }

    if (filter4 != undefined && filter4 != null) {
      stringUrl = (stringUrl + '&' + nameFilter4 + '=' + filter4);
    }
    if (filter5 != undefined && filter5 != null) {
      stringUrl = (stringUrl + '&' + nameFilter5 + '=' + filter5);
    }


    return stringUrl;

  }

  public generateHeaders(): any {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
}
