import { Component, OnInit, Input, EventEmitter, Output, OnChanges} from '@angular/core';
@Component({
  selector: 'ispit-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit,OnChanges {
  ngOnChanges()
  {
    this.promeniBrojElemenataPoStrani(this.primljenBrojElemenataPoStranici);
  }
  @Input() primljenBrojElemenataPoStranici:number;
  @Input() primljenUkupanBrojElemenata:number;
  public nizHtml:number[]=[];
  public odabranaStrana:number;
  @Output() javljenaStranaPaginacije:EventEmitter<number>;
  @Output() javljenBrojElemenata:EventEmitter<number>;
  constructor()
  {
    this.javljenaStranaPaginacije=new EventEmitter;
    this.javljenBrojElemenata = new EventEmitter;
  }

  public dobaviBrojStrana():number
  {
    return Math.ceil(this.primljenUkupanBrojElemenata/this.primljenBrojElemenataPoStranici);
  }

  public odaberiStranu(p:number)
  {
    if (p>=1 && p<=this.dobaviBrojStrana())
    {
      this.odabranaStrana=p;
      this.javljenaStranaPaginacije.emit(p);
    }
  }

  public nizZaHtml(p:number)
  {
    let niz:number[]=[];
    for (let i = 0; i < p; i++) {
      niz.push(i+1);
    }
    return niz;
  }

  promeniBrojElemenataPoStrani(p:number)
  {
    this.primljenBrojElemenataPoStranici=p;
    this.nizHtml=this.nizZaHtml(this.dobaviBrojStrana());
    this.odaberiStranu(1);
    this.javljenBrojElemenata.emit(p);
  }
  ngOnInit(): void {
    this.nizHtml=this.nizZaHtml(this.dobaviBrojStrana());
    this.odaberiStranu(this.dobaviBrojStrana());
  }
}
