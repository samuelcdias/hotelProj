import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainToolbarComponent } from './ui/main-toolbar/main-toolbar.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { MainFooterComponent } from './ui/main-footer/main-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { FuncionarioListComponent } from './funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './funcionario/funcionario-form/funcionario-form.component';
import { HospedeListComponent } from './hospede/hospede-list/hospede-list.component';
import { HospedeFormComponent } from './hospede/hospede-form/hospede-form.component';
import { ItemServicoListComponent } from './item-servico/item-servico-list/item-servico-list.component';
import { ItemServicoFormComponent } from './item-servico/item-servico-form/item-servico-form.component';
import { QuartoListComponent } from './quarto/quarto-list/quarto-list.component';
import { QuartoFormComponent } from './quarto/quarto-form/quarto-form.component';
import { ReservaListComponent } from './reserva/reserva-list/reserva-list.component';
import { ReservaFormComponent } from './reserva/reserva-form/reserva-form.component';
import { ServicoListComponent } from './servico/servico-list/servico-list.component';
import { TipoTemporadaListComponent } from './tipo-temporada/tipo-temporada-list/tipo-temporada-list.component';
import { TipoTemporadaFormComponent } from './tipo-temporada/tipo-temporada-form/tipo-temporada-form.component';
import { ServicoFormComponent } from './servico/servico-form/servico-form.component';

// Habilitar formatação de moeda e data em português
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

/**** Datas em português no MatDatepicker  ****/

// É preciso instalar os seguintes pacotes:
// yarn add @angular/material-moment-adapter moment

import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

/**********************************************/
@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainMenuComponent,
    MainFooterComponent,
    ConfirmDlgComponent,
    ClienteListComponent,
    ClienteFormComponent,
    FuncionarioListComponent,
    FuncionarioFormComponent,
    HospedeListComponent,
    HospedeFormComponent,
    ItemServicoListComponent,
    ItemServicoFormComponent,
    QuartoListComponent,
    QuartoFormComponent,
    ReservaListComponent,
    ReservaFormComponent,
    ServicoListComponent,
    TipoTemporadaListComponent,
    TipoTemporadaFormComponent,
    ServicoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
     /**** Datas em português no MatDatepicker  ****/
    MatMomentDateModule,
     /**********************************************/
  ],
  providers: [
    /**** Datas em português no MatDatepicker  ****/
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
