import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CategoriasComponent } from './components/categoria/categoria.component';
import { PlatillosComponent } from './components/platillos/platillos.component';
import { ROUTES } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipe } from './pipes/filter.pipe';
import { CategoriaPipe } from './pipes/categorias.pipe';
import {ExcelService} from './services/Excel/excel.service';


@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    PlatillosComponent,
    FilterPipe,
    CategoriaPipe
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
