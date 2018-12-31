import { Component } from '@angular/core';
import { RepositoryService } from "../../../framework/services/repository.service";
import { BasicClass } from '../../../framework/infrastructure/basic-class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasicClass {

  constructor(_dataService: RepositoryService) {
    super(_dataService);
  }

  ngOnInit() {
    this.setApiController('device');
  }

  onClickMe(){
    this.dataService.getData().subscribe(response=>{
      var t=response;
    });
  }

  onClickMe1(){
    this.dataService.GetAll().subscribe(response=>{
      var test=response;
    });
  }

}
