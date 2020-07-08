import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HospedeService } from '../hospede.service';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-hospede-list',
  templateUrl: './hospede-list.component.html',
  styleUrls: ['./hospede-list.component.scss']
})
export class HospedeListComponent implements OnInit {

  @Input() reserva : string = ''

  reservaDisabled : boolean = false

  

  hospedes : any = []

  displayedColumns : string[] = [
    'reserva', 'cliente', 'quarto', 'is_responsavel', 'editar', 'excluir'
  ]

  constructor(
    private hospedeSrv : HospedeService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    // Se for passado o parâmetro reserva pelo componente pai
    if(this.reserva != '') {
      this.hospedes = await this.hospedeSrv.filtrarReserva(this.reserva)
    }
    else {
      this.hospedes = await this.hospedeSrv.listar()
    }
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este item?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    //if(confirm('Deseja realmente excluir este item?')) {
    if(result) {
        
      try {
        await this.hospedeSrv.excluir(id)
        this.ngOnInit() // Atualizar os dados da tabela
        //alert('Exclusão efetuada com sucesso.')
        this.snackBar.open('Exclusão efetuada com sucesso.', 'Entendi', 
          { duration: 5000 });
      }
      catch(erro) {
        //alert('ERRO: não foi possível excluir este item.')
        this.snackBar.open('ERRO: não foi possível excluir este item.', 
          'Que pena!', { duration: 5000 });
      }
    }
  }
}
