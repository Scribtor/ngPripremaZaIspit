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
  // metoda za getAll sa server-a bez parametara
  getServRespWParam(p?:any):Observable<ServerResponse>
  {
    let qP={};
    if (p)
    {
      qP=
      {
        params: new HttpParams().set('sort',p.sort || "")
                                .set('sortDirection',p.sortDirection || "")
                                .set('page',p.page.toString() || "")
                                .set('pageSize',p.pageSize.toString() || "")
                                .set('filter',p.filter && JSON.stringify(p.filter) || "")
      }
    }
    return this.http.get(baseUrl,qP).pipe(map( x=> {return new ServerResponse(x) } ) )
  }
  // metoda za getAll sa server-a sa parametrima
  // params je IME OBJEKTA KLASE HttpParams koji se definiše kao "params" na back-end nodeJS Express
  // serveru i ZATO mora biti "params" a ne "p" ili "pera" ili "surla_slonova"
  // vidi ../../../server/src/controller.js
  // model je model rukovanja "fajl sistemom, odnosno .jsonima u db podfolderu odatle"
  // controller je šema kako se i koji api poziv prihvata (tu je taj "params")
  // a server kontroliše na koje adrese ćeš dobiti kakav odgovor od "servera"
  putObject(p:MainClass):Observable<MainClass>
  {
    return this.http.put( baseUrl + "/" + p.field1 , p ).pipe( map ( x=> { return new MainClass(x) } ) ) ;
  }
  // Vrlo standardna PUT metoda. Uvek proveravaj API back-enda da bi bio siguran
  // Nekad će se desiti da nema API definicije na back-endu pa džabe pišeš ovo
  // Prosleđuje ceo objekat da se OSVEŽI i nazad kao rezultat dobija osveženi objekat
  postObject(p:MainClass):Observable<MainClass>
  {
    return this.http.post(baseUrl,p).pipe(map(x=>{return new MainClass(x)}));
  }
  // Vrlo standardna POST metoda. Uvek proveravaj API back-enda da bi bio siguran
  // Nekad će se desiti da nema API definicije na back-endu pa džabe pišeš ovo
  // Prosleđuje ceo objekat da se POSTAVI i nazad kao rezultat dobija DODATI objekat
  deleteObject(p:number):Observable<MainClass>
  {
    return this.http.delete(baseUrl+"/"+p).pipe(map( x=> { return new MainClass(x) } ) ) ;
  }
  // Vrlo standardna DELETE metoda. Uvek proveravaj API back-enda da bi bio siguran
  // Nekad će se desiti da nema API definicije na back-endu pa džabe pišeš ovo
  // Prosleđuje ceo objekat da se OBRIŠE i nazad kao rezultat dobija OBRISANI objekat
  getByID(p:MainClass):Observable<MainClass>
  {
    return this.http.get(baseUrl).pipe(map( x=> { return new MainClass(x) } ) ) ;
  }
  // Specifična metoda za dobavljanje jednog određenog objekta
  // Koristi se najčešće prilikom rutiranja sa nekog prikaza (tabele napr) na formu za izmenu
  // pa se tumačenjem prosleđene url adrese poziva ova metoda koja baš taj objekat dobavlja
}
