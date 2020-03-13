import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { DummyComponent } from './core/dummy/dummy.component';
import { Dummy1Component } from './main/dummy1/dummy1.component';
import { Dummy2Component } from './main/dummy2/dummy2.component';
import { Dummy3Component } from './main/dummy3/dummy3.component';

@NgModule({
  declarations: [
    AppComponent,
    DummyComponent,
    Dummy1Component,
    Dummy2Component,
    Dummy3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
