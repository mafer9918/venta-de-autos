import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaModule } from './paginas/PaginaModule';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserInterceptorService } from './interceptores/UserInterceptor.service';
import { ClienteModule } from './clientes/ClienteModule';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PaginaModule, HttpClientModule, ClienteModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
