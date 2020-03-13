import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl="";

@Injectable({
  providedIn: 'root'
})
export class VebService {

  constructor( private http:HttpClient) { }
}
