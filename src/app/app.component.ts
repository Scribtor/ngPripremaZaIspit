import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ispit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DejanPFED25';

  constructor(private rt:Router)
  {
  }

  goD1(){
    this.rt.navigate(['/1']);
  }
  goD2(){
    let p:HTMLInputElement =  document.getElementById('extra') as HTMLInputElement;
    if (p.checked) {
      this.rt.navigate(['/3']);
    }else{
    this.rt.navigate(['/2']);}
  }
}
