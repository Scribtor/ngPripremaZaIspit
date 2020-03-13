import { Routes } from '@angular/router';
import { DummyComponent } from '../core/dummy/dummy.component';
import { Dummy1Component } from '../main/dummy1/dummy1.component';
import { Dummy2Component } from '../main/dummy2/dummy2.component';
import { Dummy3Component } from '../main/dummy3/dummy3.component';

export const routes: Routes =
[
  {path:"1",component:Dummy1Component},
  {path:"2",component:Dummy2Component},
  {path:"3",component:Dummy3Component}
];
