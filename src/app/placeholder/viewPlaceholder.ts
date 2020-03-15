import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { MainClass } from '../model/MainClass';
import { VebService } from '../services/veb.service';

export class WineListComponent implements OnInit,OnDestroy {

  public poslatLimit:number=0;
  public lista: MainClass[]=[];
  public odgSaServ:MainClass[]=[];
  public brojElemenataPoStranici:number=0;
  public paramZaServ =
  {
    sort:"",
    sortDirection:"",
    page:1,
    pageSize:50,
    filter:{
      name:""
    }
  };
  // Ovo su prvo glavni parametri, a zatim definisani objekat sa svojim poljima koje server
  // može da razume (filter,cuising,skipass....)
  constructor(private srv:VebService)
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
    this.lista=[];
    for (let i = indexStart; i < indexEnd; i++)
    {
      this.lista.push(new MainClass(this.odgSaServ[i]));
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
    return this.srv.getServRespWParam(this.paramZaServ).subscribe
    (
      data => {
        this.poslatLimit = data.results.length;
        this.odgSaServ = data.results;
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
    if (this.paramZaServ.sort==p) {
      if (this.paramZaServ.sortDirection=='desc') {
        this.paramZaServ.sortDirection = '';}
        else{this.paramZaServ.sortDirection='desc';}
    }else{
      this.paramZaServ.sort=p;
      this.paramZaServ.sortDirection='';
    }
    this.refreshList();
  }
  pretragaIme(p:string){
    this.paramZaServ.filter.name=p;
    this.refreshList();
  }
}
// Logika određivanja krajnjeg indeksa nad nekim nizom
// Logika paginacije kako će izgledati
// Implementacija promene broja elemenata, spram javljenog iz podkomponente paginacije
// Logika, iako poduža, sortiranja
// metoda dobavljanja podataka sa server
