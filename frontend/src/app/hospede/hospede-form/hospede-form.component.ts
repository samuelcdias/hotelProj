import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { HospedeService } from '../hospede.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { ReservaService } from 'src/app/reserva/reserva.service';
import { QuartoService } from 'src/app/quarto/quarto.service';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-hospede-form',
  templateUrl: './hospede-form.component.html',
  styleUrls: ['./hospede-form.component.scss']
})
export class HospedeFormComponent implements OnInit {

  title: string = 'Novo Hospede'

  reservaDisabled : boolean = false

  hospede : any = {} 

  // entidades relacionadas
  reservas : any = []
  clientes : any = []
  quartos : any = []

  constructor(
    private hospedeSrv : HospedeService,
    private reservaSrv: ReservaService,
    private clienteSrv: ClienteService,
    private quartoSrv: QuartoService,
    private snackBar: MatSnackBar,
    private router: Router,
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
        this.hospede = await this.hospedeSrv.obterUm(params['id'])
        this.title = 'Atualizando hospede'
        
        this.reservaDisabled = true
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }

    // Existe um parâmetro chamado :reserva?
    if(params['reserva']) {
      // Forçar o id da reserva no item de reserva
      this.hospede.reserva = params['reserva']
      
      // Desabilita o select da reserva
      this.reservaDisabled = true
    }

    // Entidades relacionadas
    try {
      this.reservas = await this.reservaSrv.filtrarReserva()
      this.clientes = await this.clienteSrv.listar()
      this.quartos = await this.quartoSrv.listar()
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
      this.location.back(); // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
        let msg = 'Hospede atualizado com sucesso.'
        // Se existir o campo _id, é caso de atualização
        if(this.hospede._id) {
          await this.hospedeSrv.atualizar(this.hospede)
        }
        // Senão, é caso de criar um novo hospede
        else {
          await this.hospedeSrv.novo(this.hospede)
          msg = 'Hospede criado com sucesso.'
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
