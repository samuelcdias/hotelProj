import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { QuartoService } from '../quarto.service';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-quarto-list',
  templateUrl: './quarto-list.component.html',
  styleUrls: ['./quarto-list.component.scss']
})
export class QuartoListComponent implements OnInit {

  quartos : any = []

  displayedColumns : string[] = [
    'numero', 'nro_camas', 'descricao', 'status', 'preco', 'editar', 'excluir'
  ]
  isChecked : boolean

  constructor(
    private quartoSrv : QuartoService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.quartos = await this.quartoSrv.listar()
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
        await this.quartoSrv.excluir(id)
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
