import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ReservaService } from '../reserva.service';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.scss']
})
export class ReservaListComponent implements OnInit {

  reservas : any = []

  displayedColumns : string[] = [
    'codigo', 'dt_entrada_reserva', 'dt_saida_reserva', 'is_reserva', 'obs', 'editar', 'excluir'
  ]
  isChecked : boolean

  constructor(
    private reservaSrv : ReservaService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.reservas = await this.reservaSrv.listar()
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
        await this.reservaSrv.excluir(id)
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
