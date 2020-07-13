import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';



@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.scss']
})
export class ReservaFormComponent implements OnInit {

  title: string = 'Nova Reserva'

  isreserva: Boolean = true

  today: Date = new Date()

  reserva : any = {
    codigo: String(this.today.getFullYear()) + String(this.today.getMonth()) + String(this.today.getDay()) + 'RS' + String(this.today.getTime()),
    is_reserva: true,
    tipo_temporada: "5f01ff40813d8610d41e4e1e"
  } 

  constructor(
    private reservaSrv : ReservaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    // Capturando os parâmetros da rota
    let params = this.actRoute.snapshot.params
    if (this.reserva.is_reserva) {
      this.isreserva = false // Caso seja reserva esconde parte do formulário cadastro
    }

    // Existe um parâmetro chamado :id?
    if(params['id']) {
      // É caso de atualização. É necesário consultar o back-end
      // para recuperar o registro e colocá-lo para edição
      try {
        this.reserva = await this.reservaSrv.obterUm(params['id'])
        this.title = 'Atualizando reserva'
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
      this.router.navigate(['/reserva']); // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
        let msg = 'Reserva atualizado com sucesso.'
        // Se existir o campo _id, é caso de atualização
        if(this.reserva._id) {
          await this.reservaSrv.atualizar(this.reserva)
        }
        // Senão, é caso de criar um novo reserva
        else {
          await this.reservaSrv.novo(this.reserva)
          msg = 'Reserva criado com sucesso.'
        }
        // Dá o feedback para o usuário
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        // Voltar à listagem
        this.router.navigate([`/reserva/${this.reserva._id}`])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}
