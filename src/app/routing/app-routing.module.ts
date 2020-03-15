import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from "./routes";

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Importuj glavni ng modul, modul za rutiranje i polje "routes" iz navedenog fajla
// Postavi ruter modul da za glavno rutiranje koristi baš taj specijalni fajl
// I to ti je to
