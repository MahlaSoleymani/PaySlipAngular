import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientRepositoryService {
  baseUrl = '';
  constructor(private http: HttpClient) { }

  public get(route: string, id: any = null) {
    if (id === undefined || id === null) {
      return this.http.get(this.generateUrl(route));
    }
    return this.http.get(this.generateUrl(route) + '/' + id);
  }

  public post(route: string, body) {
    return this.http.post(this.generateUrl(route), JSON.stringify(body), this.generateHeaders());
  }

  generateUrl(url: string) {
    if (url.startsWith('/')) {
      return environment.clientUrl + this.baseUrl + url;
    }
    return environment.clientUrl + this.baseUrl + '/' + url;

  }

  public generateHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
}
