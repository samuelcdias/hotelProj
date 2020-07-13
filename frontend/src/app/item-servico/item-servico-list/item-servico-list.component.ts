import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ItemServicoService } from '../item-servico.service';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-item-servico-list',
  templateUrl: './item-servico-list.component.html',
  styleUrls: ['./item-servico-list.component.scss']
})
export class ItemServicoListComponent implements OnInit {

  @Input() reserva : string = ''

  itemServicos : any = []

  displayedColumns : string[] = [
     'data_hora', 'servico', 'quantidade', 'preco_venda', 'preco_total', 'editar', 'excluir'
  ]

  constructor(
    private itemServicoSrv : ItemServicoService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    // Se for passado o parâmetro reserva pelo componente pai
    if(this.reserva != '') {
      this.itemServicos = await this.itemServicoSrv.filtrarReserva(this.reserva)
      console.log(this.itemServicos)
    }
    else {
      this.itemServicos = await this.itemServicoSrv.listar()
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
        await this.itemServicoSrv.excluir(id)
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
