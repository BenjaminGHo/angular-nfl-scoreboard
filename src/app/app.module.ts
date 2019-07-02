import { BrowserModule } from '@angular/platform-browser';  
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NFLService } from './app.service';

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    NFLService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }