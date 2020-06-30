import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../funcionario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent implements OnInit {

  title: string = 'Novo Funcionario'

  funcionario : any = {}   // Objeto vazio

  constructor(
    private funcionarioSrv : FuncionarioService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute
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

  voltar(x) {

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
