import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpleadoDTO } from '../../models/empleado.model';
import { EmpleadoService } from '../../services/empleado.service';
import { DepartamentoService } from '../../services/departamento.service';
import { DepartamentoDTO } from '../../models/departamento.model';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html'
})
export class EmpleadoFormComponent implements OnInit {
  form!: FormGroup;
  departamentos: DepartamentoDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private servicio: EmpleadoService,
    private depService: DepartamentoService,
    private dialogRef: MatDialogRef<EmpleadoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { empleado?: EmpleadoDTO }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.data.empleado?.nombre || '', Validators.required],
      apellidoPaterno: [this.data.empleado?.apellidoPaterno || ''],
      apellidoMaterno: [this.data.empleado?.apellidoMaterno || ''],
      edad: [this.data.empleado?.edad || null],
      puesto: [this.data.empleado?.puesto || ''],
      departamentoId: [this.data.empleado?.departamentoId || null]
    });

    this.depService.getAll().subscribe({
      next: data => this.departamentos = data,
      error: err => console.error(err)
    });
  }

  save() {
    if (this.form.invalid) return;
    const payload: EmpleadoDTO = this.form.value;
    if (this.data.empleado?.id) {
      this.servicio.update(this.data.empleado.id, payload).subscribe({
        next: res => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    } else {
      this.servicio.create(payload).subscribe({
        next: res => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
