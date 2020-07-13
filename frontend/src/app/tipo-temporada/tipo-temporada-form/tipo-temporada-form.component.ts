import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { TipoTemporadaService } from '../tipo-temporada.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';



@Component({
  selector: 'app-tipo-temporada-form',
  templateUrl: './tipo-temporada-form.component.html',
  styleUrls: ['./tipo-temporada-form.component.scss']
})
export class TipoTemporadaFormComponent implements OnInit {

  title: string = 'Novo período de temporada'

  minDate: Date
  maxDate: Date

  tipoTemporada : any = {
    is_alta_temporada: true
  } 

  constructor(
    private tipoTemporadaSrv : TipoTemporadaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    // Capturando os parâmetros da rota
    let params = this.actRoute.snapshot.params
    const currentYear = new Date().getFullYear()
    this.minDate = new Date()
    this.maxDate = new Date(currentYear + 2, 11, 31)

    // Existe um parâmetro chamado :id?
    if(params['id']) {
      // É caso de atualização. É necesário consultar o back-end
      // para recuperar o registro e colocá-lo para edição
      try {
        this.tipoTemporada = await this.tipoTemporadaSrv.obterUm(params['id'])
        this.title = 'Atualizando temporada'
        
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
      this.router.navigate(['/tipo-temporada']); // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      console.log(form)
      try {
        let msg = 'Temporada atualizado com sucesso.'
        // Se existir o campo _id, é caso de atualização
        if(this.tipoTemporada._id) {
          await this.tipoTemporadaSrv.atualizar(this.tipoTemporada)
        }
        // Senão, é caso de criar um novo tipotemporada
        else {
          await this.tipoTemporadaSrv.novo(this.tipoTemporada)
          msg = 'Temporada criada com sucesso.'
        }
        // Dá o feedback para o usuário
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        // Voltar à listagem
        this.router.navigate(['/tipo-temporada'])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}
