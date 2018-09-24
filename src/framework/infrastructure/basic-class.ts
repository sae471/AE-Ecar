import { OnInit } from '@angular/core';

import { RepositoryService } from "../services/repository.service";


export class BasicClass implements OnInit {
    
    dataService: RepositoryService
    assets = {} as any

    constructor() { }

    ngOnInit() {
    }
}