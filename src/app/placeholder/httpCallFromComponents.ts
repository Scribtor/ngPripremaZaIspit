import { VebService } from '../services/veb.service';
import { MainClass } from '../model/MainClass';
import { Subscription } from 'rxjs';

export class dummy
{
  field1:number;
  field2:MainClass[];
  constructor(private srv:VebService)
  {  }

  putHttp(p?:MainClass):Subscription
  {
    return this.srv.putObject(p).subscribe
    (
      _x=>{},
      err=>{  console.log("error", err.statusText); },
      ()=>{}
    )
  }

  postHttp(p?:MainClass):Subscription
  {
    return this.srv.postObject(p).subscribe
    (
      _x=>{},
      err=>{  console.log("error", err.statusText); },
      ()=>{}
    )
  }
  deleteHttp(p?:MainClass):Subscription
  {
    return this.srv.deleteObject(p.field2).subscribe
    (
     _x=>{},
     err=>{  console.log("error", err.statusText); },
     ()=>{}
    )
  }

  getHttp():Subscription
  {
    return this.srv.getServerResponse().subscribe
    (
      x=>
      {
        this.field1 = x.count;
        this.field2 = x.results;
       },
      err=>{  console.log("error", err.statusText); },
      ()=>{}
    )
  }
  getHttpParams(p:any):Subscription
  {
    return this.srv.getServRespWParam(p).subscribe
    (
      x=>
      {
        this.field1 = x.count;
        this.field2 = x.results;
      },
      err=>{  console.log("error", err.statusText); },
      ()=>{}
    )
  }
}
// Čist primer poziva servisu za get/getWParams/put/post/del i rukovanje podacima nakon stizanja
// Izdvojene su metode i obznanjeno je da vraćaju subscription DA BI
// ngOnDestroy na glavnoj VIEW metodi ili gde god već da se ove komponente pozivaju, mogao da
// otkaže subscription
// ZAŠTO? Zato što predavači ne znaju da subscription angular i dalje ne otkazuje ako je pozvan ručno
// odnosno od strane programera, eksplicitno u kodu aplikacije
