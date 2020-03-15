import { MainClass } from './MainClass';

export class ServerResponse
{
  count:number;
  results:MainClass[];

  constructor(p?:any)
  {
    this.count = p && p.count || null;
    this.results = [];
    for (let i = 0; i < this.results.length; i++)
    {
      this.results.push(new MainClass(p.results[i]))
    }
  }
}
// Dummy preset odgovora sa servera, sa brojem objekata i tim nizom
// Ovde pretpostavljam da ću odma da modelujem klasu u polje klase odgovora, ne bi li posle
// mogao da direktno prosleđujem
