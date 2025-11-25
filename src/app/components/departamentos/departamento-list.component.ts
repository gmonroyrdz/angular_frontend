import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DepartamentoDTO } from '../../models/departamento.model';
import { DepartamentoService } from '../../services/departamento.service';
import { DepartamentoFormComponent } from './departamento-form.component';
import { ViewDialogComponent } from '../../shared/view-dialog.component';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html'
})
export class DepartamentoListComponent implements OnInit {
  displayedColumns: string[] = ['id','nombre','direccion','actions'];
  dataSource = new MatTableDataSource<DepartamentoDTO>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private servicio: DepartamentoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.servicio.getAll().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => console.error(err)
    });
  }

  openCreate() {
    const dialogRef = this.dialog.open(DepartamentoFormComponent, { width: '400px', data: { }});
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.load();
    });
  }

  edit(row: DepartamentoDTO) {
    const dialogRef = this.dialog.open(DepartamentoFormComponent, { width: '400px', data: { departamento: row }});
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.load();
    });
  }

  view(id?: number) {
    if (!id) return;
    this.servicio.getById(id).subscribe({
      next: data => {
        this.dialog.open(ViewDialogComponent, { width: '500px', data: { title: `Departamento ${id}`, entity: data }});
      },
      error: err => console.error(err)
    });
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('Eliminar departamento?')) return;
    this.servicio.delete(id).subscribe({
      next: () => this.load(),
      error: err => console.error(err)
    });
  }
}
