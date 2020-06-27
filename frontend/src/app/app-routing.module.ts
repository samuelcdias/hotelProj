import { FuncionarioListComponent } from './funcionario/funcionario-list/funcionario-list.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { FuncionarioFormComponent } from './funcionario/funcionario-form/funcionario-form.component';
import { HospedeListComponent } from './hospede/hospede-list/hospede-list.component';
import { HospedeFormComponent } from './hospede/hospede-form/hospede-form.component';
import { ItemServicoListComponent } from './item-servico/item-servico-list/item-servico-list.component';
import { ItemServicoFormComponent } from './item-servico/item-servico-form/item-servico-form.component';
import { QuartoFormComponent } from './quarto/quarto-form/quarto-form.component';
import { QuartoListComponent } from './quarto/quarto-list/quarto-list.component';
import { ReservaFormComponent } from './reserva/reserva-form/reserva-form.component';
import { ReservaListComponent } from './reserva/reserva-list/reserva-list.component';
import { ServicoListComponent } from './servico/servico-list/servico-list.component';
import { ServicoFormComponent } from './servico/servico-form/servico-form.component';
import { TipoTemporadaFormComponent } from './tipo-temporada/tipo-temporada-form/tipo-temporada-form.component';
import { TipoTemporadaListComponent } from './tipo-temporada/tipo-temporada-list/tipo-temporada-list.component';


const routes: Routes = [
  {
    path: 'cliente',
    component: ClienteListComponent
  },
  {
    path: 'cliente/novo',
    component: ClienteFormComponent
  },
  {
    path: 'cliente/:id',
    component: ClienteFormComponent
  },
  {
    path: 'funcionario',
    component: FuncionarioListComponent
  },
  {
    path: 'funcionario/novo',
    component: FuncionarioFormComponent
  },
  {
    path: 'funcionario/:id',
    component: FuncionarioFormComponent
  },
  {
    path: 'hospede',
    component: HospedeListComponent
  },
  {
    path: 'hospede/novo',
    component: HospedeFormComponent
  },
  {
    path: 'hospede/:id',
    component: HospedeFormComponent
  },
  {
    path: 'item-servico',
    component: ItemServicoListComponent
  },
  {
    path: 'item-servico/novo',
    component: ItemServicoFormComponent
  },
  {
    path: 'item-servico/:id',
    component: ItemServicoFormComponent
  },
  {
    path: 'quarto',
    component: QuartoListComponent
  },
  {
    path: 'quarto/novo',
    component: QuartoFormComponent
  },
  {
    path: 'quarto/:id',
    component: QuartoFormComponent
  },
  {
    path: 'reserva',
    component: ReservaListComponent
  },
  {
    path: 'reserva/novo',
    component: ReservaFormComponent
  },
  {
    path: 'reserva/:id',
    component: ReservaFormComponent
  },
  {
    path: 'servico',
    component: ServicoListComponent
  },
  {
    path: 'servico/novo',
    component: ServicoFormComponent
  },
  {
    path: 'servico/:id',
    component: ServicoFormComponent
  },
  {
    path: 'tipo-Temporada',
    component: TipoTemporadaListComponent
  },
  {
    path: 'tipo-temporada/novo',
    component: TipoTemporadaFormComponent
  },
  {
    path: 'tipo-temporada/:id',
    component: TipoTemporadaFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
