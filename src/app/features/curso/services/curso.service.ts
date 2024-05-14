import { Injectable } from '@angular/core';
import { delay, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICurso } from '../models/Icurso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private readonly API = "http://localhost:3001/";

  constructor(private http: HttpClient) {}

  public get() {
    return this.http.get<ICurso[]>(`${this.API}curso`).pipe(
      delay(1000)
    )
  }

  public create (dados: any) {
    return this.http.post(`${this.API}curso`, dados).pipe(
      take(1)
    )
  }



}
