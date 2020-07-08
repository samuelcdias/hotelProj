import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { QuartoService } from '../quarto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';



@Component({
  selector: 'app-quarto-form',
  templateUrl: './quarto-form.component.html',
  styleUrls: ['./quarto-form.component.scss']
})
export class QuartoFormComponent implements OnInit {

  title: string = 'Novo Quarto'

  quarto : any = {
    cama_casal: false,
    cama_extra: 0,
    status: 'Disponível',
    
  }   

  status_list: any = [
    {
      nome: 'Disponível'
    },
    {
      nome: 'Em manutenção'
    },
    {
      nome: 'Executando Limpeza'
    },
    {
      nome: 'Ocupado'
    },
    {
      nome: 'Indisponível'
    },
    {
      nome: 'Desativado'
    }
  ]

  constructor(
    private quartoSrv : QuartoService,
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
        this.quarto = await this.quartoSrv.obterUm(params['id'])
        this.title = 'Atualizando quarto'
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
      this.router.navigate(['/quarto']); // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
        let msg = 'Quarto atualizado com sucesso.'
        // Se existir o campo _id, é caso de atualização
        if(this.quarto._id) {
          await this.quartoSrv.atualizar(this.quarto)
        }
        // Senão, é caso de criar um novo quarto
        else {
          await this.quartoSrv.novo(this.quarto)
          msg = 'Quarto criado com sucesso.'
        }
        // Dá o feedback para o usuário
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        // Voltar à listagem
        this.router.navigate(['/quarto'])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}
