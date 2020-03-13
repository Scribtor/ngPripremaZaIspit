import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { MainClass } from '../model/MainClass';
import { VebServisService } from '../services/veb-servis.service';

export class WineListComponent implements OnInit,OnDestroy {

  public poslatLimit:number=0;
  public ListaVina: MainClass[]=[];
  public httpRSVP:MainClass[]=[];
  public brojElemenataPoStranici:number=0;
  public hstpParamS =
  {
    sort:"",
    sortDirection:"",
    page:1,
    pageSize:50,
    filter:{
      name:""
    }
  };
  constructor(private srv:VebServisService)
  {
  }

  odrediKrajnjiIndex(pIndextmp:number,pElemtmp:number,pLimittmp:number):number
  {
    let tmp:number = pIndextmp+pElemtmp;
    if (
          (pIndextmp+pElemtmp)>pLimittmp
       )
    {
      tmp=pIndextmp + (pLimittmp-pIndextmp);
      return tmp;
    }
    return tmp;
  }

  public izmeniStranuPaginacije(javljenaStranicaPaginacije:number)
  {
    let tp = Number(javljenaStranicaPaginacije);
    let pIndex:number=0;
    pIndex = (tp-1)*this.brojElemenataPoStranici;
    let kIndex:number=0;
    kIndex = Number(this.odrediKrajnjiIndex(Number(pIndex),Number(this.brojElemenataPoStranici),Number(this.poslatLimit)));
    this.praviListu(pIndex,kIndex,this.brojElemenataPoStranici);
  }
  public praviListu(indexStart:number, indexEnd:number,brElem:number)
  {
    this.ListaVina=[];
    for (let i = indexStart; i < indexEnd; i++)
    {
      this.ListaVina.push(new MainClass(this.httpRSVP[i]));
    }
    this.brojElemenataPoStranici=brElem;
  }
  izmeniBrojElemenataPoStrani(p:number)
  {
    this.brojElemenataPoStranici=Number(p);
    this.izmeniStranuPaginacije(1);
  }
  refreshList():Subscription
  {
    return this.srv.getServRespWParam(this.hstpParamS).subscribe
    (
      data => {
        this.poslatLimit = data.results.length;
        this.httpRSVP = data.results;
              },
      error => {
        console.log("error", error.statusText);
               },
      () => {
        this.izmeniBrojElemenataPoStrani(this.poslatLimit);
       },
    );
  }
  ngOnInit(): void {
    this.refreshList();
  }
  ngOnDestroy (): void
  {
    this.refreshList().unsubscribe();
  }
  callSort(p:string)
  {
    if (this.hstpParamS.sort==p) {
      if (this.hstpParamS.sortDirection=='desc') {
        this.hstpParamS.sortDirection = '';}
        else{this.hstpParamS.sortDirection='desc';}
    }else{
      this.hstpParamS.sort=p;
      this.hstpParamS.sortDirection='';
    }
    this.refreshList();
  }
  pretragaIme(p:string){
    this.hstpParamS.filter.name=p;
    this.refreshList();
  }
}
