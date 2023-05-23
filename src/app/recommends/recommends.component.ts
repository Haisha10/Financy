import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recommends',
  templateUrl: './recommends.component.html',
  styleUrls: ['./recommends.component.css']
})
export class RecommendsComponent {
  constructor(private location: Location){
  }
  currentUrl:any = this.location.path();
  id:Number = parseInt(this.currentUrl.split('/').pop());
}
