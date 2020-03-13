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
