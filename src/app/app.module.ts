import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaModule } from './paginas/PaginaModule';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    PaginaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
