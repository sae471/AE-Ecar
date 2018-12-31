import { OnInit } from '@angular/core';

import { RepositoryService } from "../services/repository.service";


export class BasicClass implements OnInit {
    
    dataService: RepositoryService
    assets = {} as any

    constructor(_dataService: RepositoryService) { 
        this.dataService=_dataService;
    }

    ngOnInit() {
    }

    setApiController(controllerName){
        this.dataService.controller=controllerName;
    }
}