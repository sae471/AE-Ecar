import { Component } from '@angular/core';
import { BasicClass } from '../../../framework/infrastructure/basic-class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasicClass {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
