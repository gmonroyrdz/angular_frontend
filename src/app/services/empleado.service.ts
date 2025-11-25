import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmpleadoDTO } from '../models/empleado.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private base = `${environment.apiUrl}/empleados`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<EmpleadoDTO[]> {
    return this.http.get<EmpleadoDTO[]>(this.base).pipe(catchError(this.handleError));
  }
  getById(id: number) {
    return this.http.get<EmpleadoDTO>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }
  create(emp: EmpleadoDTO) {
    return this.http.post<EmpleadoDTO>(this.base, emp).pipe(catchError(this.handleError));
  }
  update(id: number, emp: EmpleadoDTO) {
    return this.http.put<EmpleadoDTO>(`${this.base}/${id}`, emp).pipe(catchError(this.handleError));
  }
  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }
  private handleError(err: any) {
    console.error(err);
    return throwError(() => err);
  }
}
