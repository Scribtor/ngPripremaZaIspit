import { SubClass } from './SubClass';

export class MainClass
{
  field1:string;
  field2:number;
  field3:number;
  field4:string;
  field5:string;
  field6:SubClass[];

  constructor(p?:any)
  {
    this.field1 = p && p.field1 || null;
    this.field2 = p && p.field2 || null;
    this.field3  = p && p.field3 || null;
    this.field4 = p && p.field4 || null;
    this.field5 = p && p.field5 || null;
    this.field6 = [];
    for (let i = 0; i < this.field6.length; i++)
    {
      this.field6.push(new SubClass(p.field6[i]));
    }
  }
}
// Neka bezveze klasa, sa par polja, i sa jednim koje može eventualno da bude podklasa ili povezana
// klasa, pa sam i za tu eventualiju napisao prikladan konstruktor
// što više da štedim vremena bezmozgnog kucanja, to bolje
