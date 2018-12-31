
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IFilter,ISort } from '../interfaces/request-helper';
import { isDefined } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  controller=''
  protected apiServerMetadataUrl = AppConfig.settings.apiServer.metadata;

  constructor(private http: HttpClient) { }

  public GetById(controllerName: string=this.controller,id:string) {
    var params=new HttpParams()
    .set('id',id)
    return this.getData('GetById',controllerName,params)
  }

  public GetAll(controllerName: string=this.controller,
    filter:IFilter=undefined,sort:ISort=undefined,page:number=undefined,take:number=undefined) {
    var params=new HttpParams();

    if(isDefined(page)){
      params.set('page',page.toString());
    }

    if(isDefined(take)){
      params.set('take',take.toString());
    }

    if(isDefined(sort)){
      params.set('sort',JSON.stringify(sort));
    }

    if(isDefined(filter)){
      params.set('filters',JSON.stringify(filter));
    }
    
    return this.getData('GetAll',controllerName,params)
  }
  
  public getData(methodName: string='',controllerName: string=this.controller,params:HttpParams=undefined) : Observable<any> {
    var url=this.createCompleteRoute(methodName,controllerName);
    return this.http.get(url,{params:params}).pipe(
      tap((response: any) => this.handleError(url,response)),
      catchError(this.handleError(url,[]))
    );

    // return this.http
    // .get(this.createCompleteRoute(methodName,controllerName),{params:params})
    // .subscribe(response=>
    //   {
    //       if(response.hasOwnProperty('data') && response.hasOwnProperty('succeeded')){
    //           if(<boolean>response['succeeded']){
    //                   return response;
    //           }else{
    //               response['errors'];
    //               if(Array.isArray(response['errors'])){
    //                 var errors=Object.keys(response['errors']).map(key => ({type: key, value: response['errors'][key]}));
    //                 var msg='';
    //                 errors.forEach(element => {
    //                   msg+=((msg!='')?'<br/>':'')+element['message'];
    //                 });
    //                 alert(msg);
    //               }
    //           }
    //       }else{
    //           return response;
    //       }
    //   },error=>{
    //       console.error(error);
    //   });
  }
 
  // public create(route: string, body) {
  //   return this.http.post(this.createCompleteRoute(route, this.apiServerMetadataUrl), body, this.generateHeaders());
  // }
 
  // public update(route: string, body){
  //   return this.http.put(this.createCompleteRoute(route, this.apiServerMetadataUrl), body, this.generateHeaders());
  // }
 
  // public delete(route: string){
  //   return this.http.delete(this.createCompleteRoute(route, this.apiServerMetadataUrl));
  // }
 
  private createCompleteRoute(methodName,controllerName) {
    return `${this.apiServerMetadataUrl}/${controllerName}/${methodName}`;
  }
 
  // private generateHeaders() {
  //   return {
  //     headers: new HttpHeaders({'Content-Type': 'application/json'})
  //   }
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      if(isDefined(error.error.Errors) && isDefined(error.error.Succeeded) ){
        var errors=Object.keys(error.error.Errors).map(key => ({type: key, value: error.error.Errors[key]}));
        var msg='';
        errors.forEach(element => {
          msg+=((msg!='')?'<br/>-------------------<br/>':'')+element.value.Message;
          if(element.value.InnerException!=''){
            msg+='<br/>'+element.value.InnerException;
          }
        });
        alert(msg);
    }
    else{
      console.error(error); // log to console instead
    }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
