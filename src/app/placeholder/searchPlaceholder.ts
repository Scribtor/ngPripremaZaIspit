import { OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
export class SearchFormComponent implements OnInit {
@Output() query:EventEmitter<string>;
pretraga:FormGroup;
  constructor(private fb:FormBuilder) {
    this.query=new EventEmitter();
    this.pretraga=fb.group({
      'upit':''
    });
  }

  ngOnInit(): void {
  }

  pronadji()
  {
    this.query.emit(this.pretraga.value.upit);
  }
}
