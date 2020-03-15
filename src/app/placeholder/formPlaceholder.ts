import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VebService } from '../services/veb.service';
import { MainClass } from '../model/MainClass';
export class EditMainClassComponent implements OnInit {
  public form1:FormGroup;
  public obj1:MainClass;

  constructor
    (
    private rt: Router,
    private fb:FormBuilder,
    private ar:ActivatedRoute,
    private srv:VebService
    )

  {
    this.makeForm();
  }
  ngOnInit(): void {
    this.form1.reset();
    this.obj1=this.form1.value;
    let id:string = this.ar.snapshot.params.id;
    if (id!==undefined)
    {
    this.getIDHttp();
    }
  }
  private getIDHttp() {
    this.srv.getByID(this.obj1).subscribe
    (
      x => {
      this.obj1 = x;
      this.form1.patchValue(this.obj1)
           },
          //  Ovde je glavno dešavanje, po dolasku podataka
      err => {   console.log("error", err.statusText);  },
      // Ispis eventualnih grešaka u konzolu
      () => {}
      // Zgodno za kontrolu toka, ovo se izvršava NA SAMOM KRAJU asinhronog poziva, baš kad imamo
      // podatke
    );
  }

  onSubmit()
  {
    let submit:MainClass=new MainClass(this.form1.value);
    if (this.obj1 && this.obj1.field1)
    {
      this.putToHttp(submit);
    }else
    {
      this.postToHttp(submit);
    }

  }
  private postToHttp(submit?: MainClass):Subscription {
    return this.srv.postObject(submit).subscribe(
      _x => { this.form1.reset(); },
      err => {   console.log("error", err.statusText); },
      () => {
        this.rt.navigate(['']);
            });
  }

  private putToHttp(submit?: MainClass):Subscription {
    submit.field1 = this.obj1.field1;
    return this.srv.putObject(submit).subscribe(
      _x => { this.form1.reset(); },
      err => {   console.log("error", err.statusText); },
      () => {
        this.rt.navigate(['']);
            });
  }

  onRevert()
  {
    this.form1.reset();
  }
  makeForm()
  {
    this.form1=this.fb.group(
      {
        field1:['',[Validators.required,Validators.minLength(2)]],
        field2:['',[Validators.required,Validators.min(1900),Validators.max(2020)]],
        field3:['',[Validators.required]],
        field4:['',[Validators.required]],
        field5:['',[Validators.required]],
        field6:['',[Validators.required]]
      })
  }
}
// Primer fajla koji odgovara istoimenom HTML-u i kojem samo treba dodati/oduzeti polja i promeniti
// tipove za vrednosti tih polja. Maksimalno skraćen posao za pripremu forme
// Ovo na ispitu će samo zahtevati refaktorisanje osim polja, refaktorisanje eventualno validatora
// i ne daj Bože custom validacije, dodavanje metode koja će to da odradi ČISTIJE i JEFTINIJE
// odnosno metode koja će da vraća boolean (vidi wine projekat) i na osnovu toga će angularu
// da bude rečeno da spreči submit forme ako sve nije ispravno
// drugo, ovde takođe submit prepoznaje izmenu od prostog dodavanje i spram toga će se i ponašati
// i prozivati servis
