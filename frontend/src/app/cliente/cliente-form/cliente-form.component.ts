import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  title: string = 'Novo Cliente'

  cliente : any = {}   // Objeto vazio

  funcoes_areas: any = [
    {
      codigo: 'SG',
      nome: 'SG = Serviços Gerais'
    },
    {
      codigo: 'CZ',
      nome: 'CZ = Cozinheiro'
    },
    {
      codigo: 'AT',
      nome: 'AT = Atendente'
    },
    {
      codigo: 'GE',
      nome: 'GE = Gerente'
    },

  ]

  constructor(
    private clienteSrv : ClienteService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    // Capturando os parâmetros da rota
    let params = this.actRoute.snapshot.params

    // Existe um parâmetro chamado :id?
    if(params['id']) {
      // É caso de atualização. É necesário consultar o back-end
      // para recuperar o registro e colocá-lo para edição
      try {
        this.cliente = await this.clienteSrv.obterUm(params['id'])
        this.title = 'Atualizando cliente'
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
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
      this.router.navigate(['/cliente']); // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
        let msg = 'Cliente atualizado com sucesso.'
        // Se existir o campo _id, é caso de atualização
        if(this.cliente._id) {
          await this.clienteSrv.atualizar(this.cliente)
        }
        // Senão, é caso de criar um novo cliente
        else {
          await this.clienteSrv.novo(this.cliente)
          msg = 'Cliente criado com sucesso.'
        }
        // Dá o feedback para o usuário
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        // Voltar à listagem
        this.router.navigate(['/cliente'])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}
