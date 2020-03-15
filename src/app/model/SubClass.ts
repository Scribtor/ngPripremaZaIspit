export class SubClass
{
  field1:string;
  field2:number;
  field3:string;
  field4:string;

  constructor(p?:any)
  {
    this.field1 = p && p.field1 || null;
    this.field2 = p && p.field2 || null;
    this.field3 = p && p.field3 || null;
    this.field4 = p && p.field4 || null;
  }
}
// Vrlo prosto, sve na osnovu određeneog JS specifičnog ponašanja gde u konstruktoru mogu
// da istovremeno proveravam postojanje objekta kao i njegovog polja, i na osnovu toga da
// postavljam vrednost u konstruktoru, odnosno postavljanje null-a ako se uslovi ne ispunjavaju
