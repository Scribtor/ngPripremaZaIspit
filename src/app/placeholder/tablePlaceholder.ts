import { OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'
import { VebService } from "../services/veb.service";
import { MainClass } from '../model/MainClass';
export class TableComponent implements OnInit {
 @Input() public lista: MainClass[];
 @Output() private delEmitter :EventEmitter<number>;
 @Output() private sortiraj: EventEmitter<string>;

  constructor(private rt:Router,private srv:VebService)
  {
    this.delEmitter=new EventEmitter;
    this.sortiraj=new EventEmitter;
  }
  callDelete(p:number):void
  {
    this.srv.deleteObject(p).subscribe(
      x=> {this.delEmitter.emit(Number(x.field1))},
      err =>{  console.log("error", err.statusText); },
      ()=>{});
  }
  callEdit(p:number):void
  {
    this.rt.navigate(['obj/', p]);
  }
  ngOnInit(): void {
  }
  emitujSort(p:string)
  {
    this.sortiraj.emit(p);
  }

}
// Ovo je primer prepisan iz projekta s vinima, gde paginacija i tabela mogu rame uz rame da stoje
// Ali biće drugih situacija gde to neće biti moguće
// Zato sam i usvojio da paginacija može i treba da bude sama za sebe da stoji
// Slično kao i paginacija, i tabela zavisi samo od niza objekata koje dobije od pozivajuće
// komponente, i onda spram toga, ngfor-om pravi listu za prikaz, a podatke prikazuje interpolacijom
// Za razliku od paginacije, tabela emituje sort pravilo i ID objekta za brisanje
