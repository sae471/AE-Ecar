import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule}from "@angular/router";
import { HttpModule } from '@angular/http';

import { AppConfig } from './../framework/config/app.config';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './layout/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    // RouterModule.forRoot([
    //   { path: 'home', component: HomeComponent },
    //   { path: '404', component : NotFoundComponent},
    //   { path: '', redirectTo: '/home', pathMatch: 'full' },
    //   { path: '**', redirectTo: '/404', pathMatch: 'full'}
    // ]),
    AppRoutingModule,
    AdminModule
  ],
  providers: [
    AppConfig,
       { provide: APP_INITIALIZER,
         useFactory: initializeApp,
         deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
