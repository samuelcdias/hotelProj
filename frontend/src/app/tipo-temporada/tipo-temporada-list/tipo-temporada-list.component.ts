import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TipoTemporadaService } from '../tipo-temporada.service';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-tipo-temporada-list',
  templateUrl: './tipo-temporada-list.component.html',
  styleUrls: ['./tipo-temporada-list.component.scss']
})
export class TipoTemporadaListComponent implements OnInit {

  tiposTemporada : any = []

  displayedColumns : string[] = [
    'data_inicio', 'is_alta_temporada', 'editar', 'excluir'
  ]

  constructor(
    private tipoTemporadaSrv : TipoTemporadaService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.tiposTemporada = await this.tipoTemporadaSrv.listar()
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
        await this.tipoTemporadaSrv.excluir(id)
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
