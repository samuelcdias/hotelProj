import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { ItemServicoService } from '../item-servico.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { ReservaService } from 'src/app/reserva/reserva.service';
import { ServicoService } from 'src/app/servico/servico.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-servico-form',
  templateUrl: './item-servico-form.component.html',
  styleUrls: ['./item-servico-form.component.scss']
})
export class ItemServicoFormComponent implements OnInit {
  
  title: string = 'Novo item de servico'
  
  reservaDisabled : boolean = false

  itemServico : any = {
  } 

  // entidades relacionadas
  reservas : any = []
  servicos : any = []

  constructor(
    private itemServicoSrv : ItemServicoService,
    private reservaSrv: ReservaService,
    private servicoSrv: ServicoService,
    private snackBar: MatSnackBar,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location
  ) { }

  async ngOnInit() {
    // Capturando os parâmetros da rota
    let params = this.actRoute.snapshot.params

    // Existe um parâmetro chamado :id?
    if(params['id']) {
      // É caso de atualização. É necesário consultar o back-end
      // para recuperar o registro e colocá-lo para edição
      try {
        this.itemServico = await this.itemServicoSrv.obterUm(params['id'])
        this.title = 'Atualizando item de servico'

        // Impede a alteração da reserva relacionada ao item
        this.reservaDisabled = true
        
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }

    // Existe um parâmetro chamado :reserva?
    if(params['reserva']) {
      // Forçar o id da reserva no item de reserva
      this.itemServico.reserva = params['reserva']
      
      // Desabilita o select da reserva
      this.reservaDisabled = true
    }
    
    // Entidades relacionadas
    try {
      this.reservas = await this.reservaSrv.filtrarReserva()
      this.servicos = await this.servicoSrv.listar()
    }
    catch(erro) {
      this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})  
    }
  
  }

  async voltar(form: NgForm) {

    let result = true;
    console.log(form);
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if(result) {
      this.location.back() // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
        let msg = 'ItemServico atualizado com sucesso.'
        // Se existir o campo _id, é caso de atualização
        if(this.itemServico._id) {
          await this.itemServicoSrv.atualizar(this.itemServico)
        }
        // Senão, é caso de criar um novo itemServico
        else {
          await this.itemServicoSrv.novo(this.itemServico)
          msg = 'ItemServico criado com sucesso.'
        }
        // Dá o feedback para o usuário
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        // Voltar à listagem
        this.location.back()
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}
