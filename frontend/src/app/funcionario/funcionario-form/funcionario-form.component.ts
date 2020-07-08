import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../funcionario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent implements OnInit {

  title: string = 'Novo Funcionario'

  funcionario : any = {}   // Objeto vazio

  funcoes_areas : any = [
    {
      nome: "SG - Serviços Gerais",
      codigo: "SG"
    },
    {
      nome: "CZ - Cozinheiro",
      codigo: "CZ"
    },
    {
      nome: "AT - Atendente",
      codigo: "AT"
    },
    {
      nome: "GE - Gerente",
      codigo: "GE"
    }
  ]

  constructor(
    private funcionarioSrv : FuncionarioService,
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
        this.funcionario = await this.funcionarioSrv.obterUm(params['id'])
        this.title = 'Atualizando funcionario'
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
      this.router.navigate(['/funcionario']); // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
        let msg = 'Funcionario atualizado com sucesso.'
        // Se existir o campo _id, é caso de atualização
        if(this.funcionario._id) {
          await this.funcionarioSrv.atualizar(this.funcionario)
        }
        // Senão, é caso de criar um novo funcionario
        else {
          await this.funcionarioSrv.novo(this.funcionario)
          msg = 'Funcionario criado com sucesso.'
        }
        // Dá o feedback para o usuário
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        // Voltar à listagem
        this.router.navigate(['/funcionario'])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}
