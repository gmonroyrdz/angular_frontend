import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepartamentoDTO } from '../models/departamento.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DepartamentoService {
  private base = `${environment.apiUrl}/departamentos`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<DepartamentoDTO[]> {
    return this.http.get<DepartamentoDTO[]>(this.base).pipe(catchError(this.handleError));
  }
  getById(id: number) {
    return this.http.get<DepartamentoDTO>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }
  create(dep: DepartamentoDTO) {
    return this.http.post<DepartamentoDTO>(this.base, dep).pipe(catchError(this.handleError));
  }
  update(id: number, dep: DepartamentoDTO) {
    return this.http.put<DepartamentoDTO>(`${this.base}/${id}`, dep).pipe(catchError(this.handleError));
  }
  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }
  private handleError(err: any) {
    console.error(err);
    return throwError(() => err);
  }
}
