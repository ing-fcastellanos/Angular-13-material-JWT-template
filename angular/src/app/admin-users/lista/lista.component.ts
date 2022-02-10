import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService, AlertService } from '@app/_services';
import { ConfirmDialog } from '@app/_dialogs/dialogs.component';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'options'];
  dataSource: MatTableDataSource<any[]>;
  account = this.accountService.accountValue;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  accounts: any[];

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fillDataSet();
  }

  fillDataSet(){
    this.accountService.getAll()
    .pipe(first())
    .subscribe(accounts => {
      this.accounts = accounts;
      this.dataSource = new MatTableDataSource(this.accounts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = "Usuarios mostradas por página:";
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserFriendlyName(role) {
    switch (role) {
      case 'Admin': return 'Administrador global';
      case 'User': return 'Usuario regular';
      case 'Ventas': return 'Punto de Venta';
      case 'Supervisor': return 'Supervisor';
      default: return role;
    }
  }

  borrarUsuario(idUser){
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        mensaje: 'Se borrará el usuario seleccionado, continuar?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountService.delete(idUser).pipe(first()).subscribe(result => {
          this.fillDataSet();
          this.alertService.success("Usuario borrado correctamente");
        }, err =>{
          this.alertService.error(err);

        })
      }
    });
  }
}
