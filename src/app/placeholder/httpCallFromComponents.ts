import { VebServisService } from '../services/veb-servis.service';
import { MainClass } from '../model/MainClass';
import { Subscription } from 'rxjs';

export class dummy
{
  field1:number;
  field2:MainClass[];
  constructor(private srv:VebServisService)
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
    return this.srv.deleteObject(p).subscribe
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
