import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartamentoDTO } from '../../models/departamento.model';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html'
})
export class DepartamentoFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicio: DepartamentoService,
    private dialogRef: MatDialogRef<DepartamentoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { departamento?: DepartamentoDTO }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.data.departamento?.nombre || '', Validators.required],
      direccion: [this.data.departamento?.direccion || '']
    });
  }

  save() {
    if (this.form.invalid) return;
    const payload: DepartamentoDTO = this.form.value;
    if (this.data.departamento?.id) {
      this.servicio.update(this.data.departamento.id, payload).subscribe({
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
