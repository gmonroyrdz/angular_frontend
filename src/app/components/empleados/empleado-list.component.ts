import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpleadoDTO } from '../../models/empleado.model';
import { EmpleadoService } from '../../services/empleado.service';
import { EmpleadoFormComponent } from './empleado-form.component';
import { ViewDialogComponent } from '../../shared/view-dialog.component';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html'
})
export class EmpleadoListComponent implements OnInit {
  displayedColumns: string[] = ['id','nombre','apellidoPaterno','apellidoMaterno','edad','puesto','departamentoId','actions'];
  dataSource = new MatTableDataSource<EmpleadoDTO>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private servicio: EmpleadoService, private dialog: MatDialog) {}

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
    const dialogRef = this.dialog.open(EmpleadoFormComponent, { width: '400px', data: { }});
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.load();
    });
  }

  edit(row: EmpleadoDTO) {
    const dialogRef = this.dialog.open(EmpleadoFormComponent, { width: '400px', data: { empleado: row }});
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.load();
    });
  }

  view(id?: number) {
    if (!id) return;
    this.servicio.getById(id).subscribe({
      next: data => {
        this.dialog.open(ViewDialogComponent, { width: '500px', data: { title: `Empleado ${id}`, entity: data }});
      },
      error: err => console.error(err)
    });
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('Eliminar empleado?')) return;
    this.servicio.delete(id).subscribe({
      next: () => this.load(),
      error: err => console.error(err)
    });
  }
}
