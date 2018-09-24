import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  protected apiServerMetadataUrl = AppConfig.settings.apiServer.metadata;

  constructor(private http: HttpClient) { }

  public getData(route: string) {
    return this.http.get(this.createCompleteRoute(route, this.apiServerMetadataUrl));
    //
  }
 
  public create(route: string, body) {
    return this.http.post(this.createCompleteRoute(route, this.apiServerMetadataUrl), body, this.generateHeaders());
  }
 
  public update(route: string, body){
    return this.http.put(this.createCompleteRoute(route, this.apiServerMetadataUrl), body, this.generateHeaders());
  }
 
  public delete(route: string){
    return this.http.delete(this.createCompleteRoute(route, this.apiServerMetadataUrl));
  }
 
  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }
 
  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
}
