import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators/";
import { ServerResponse } from '../model/HTTPResp';
import { Observable } from 'rxjs';
import { MainClass } from '../model/MainClass';

const baseUrl="";

@Injectable({
  providedIn: 'root'
})
export class VebService {

  constructor( private http:HttpClient) { }

  getServerResponse():Observable<ServerResponse>
  {
    return this.http.get(baseUrl).pipe(map( x=> { return new ServerResponse(x)} ));
  }
  getServRespWParam(p?:any):Observable<ServerResponse>
  {
    let qP={};
    if (p)
    {
      qP=
      {
        filter: new HttpParams().set('sort',p.sort || "")
                                .set('sortDirection',p.sortDirection || "")
                                .set('page',p.page.toString() || "")
                                .set('pageSize',p.pageSize.toString() || "")
                                .set('filter',p.filter && JSON.stringify(p.filter) || "")
      }
    }
    return this.http.get(baseUrl,qP).pipe(map( x=> {return new ServerResponse(x) } ) )
  }
  putObject(p:MainClass):Observable<MainClass>
  {
    return this.http.put( baseUrl + "/" + p.field1 , p ).pipe( map ( x=> { return new MainClass(x) } ) ) ;
  }
  postObject(p:MainClass):Observable<MainClass>
  {
    return this.http.post(baseUrl,p).pipe(map(x=>{return new MainClass(x)}));
  }
  deleteObject(p:number):Observable<MainClass>
  {
    return this.http.delete(baseUrl+"/"+p).pipe(map( x=> { return new MainClass(x) } ) ) ;
  }
  getByID(p:MainClass):Observable<MainClass>
  {
    return this.http.get(baseUrl).pipe(map( x=> { return new MainClass(x) } ) ) ;
  }
}
