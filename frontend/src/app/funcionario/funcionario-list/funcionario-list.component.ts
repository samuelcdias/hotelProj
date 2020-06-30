import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FuncionarioService } from '../funcionario.service';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.scss']
})
export class FuncionarioListComponent implements OnInit {

  funcionarios : any = []

  displayedColumns : string[] = [
    'nome', 'endereco', 'telefone', 'email', 'funcao_area', 'editar', 'excluir'
  ]

  constructor(
    private funcionarioSrv : FuncionarioService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.funcionarios = await this.funcionarioSrv.listar()
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
        await this.funcionarioSrv.excluir(id)
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
