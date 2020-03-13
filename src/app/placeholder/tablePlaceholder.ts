import { OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'
import { VebServisService } from '../services/veb-servis.service';
import { MainClass } from '../model/MainClass';
export class TableComponent implements OnInit {
 @Input() public lista: MainClass[];
 @Output() private deleteEmitter :EventEmitter<number>;
 @Output() private sortiraj: EventEmitter<string>;

  constructor(private rt:Router,private srv:VebServisService)
  {
    // this.javiPromenuElem=new EventEmitter;
    this.deleteEmitter=new EventEmitter;
    this.sortiraj=new EventEmitter;
  }
  callDelete(p:number):void
  {
    this.srv.deleteObject(p).subscribe(
      x=> {this.deleteEmitter.emit(Number(x.field1))},
      err =>{  console.log("error", err.statusText); },
      ()=>{});
  }
  callEdit(p:number):void
  {
    this.rt.navigate(['obj/', p]);
    // Ovo bi bila alternativa za izmenu vina, ali koja bi zahteva injekciju rutera unutar tabele
    // Što po meni nema smisla, jer nema potrebe da zatrpavamo memoriju glupostima
  }
  ngOnInit(): void {
  }
  emitujSort(p:string)
  {
    this.sortiraj.emit(p);
  }

}
