import { Injectable } from '@angular/core';
import { delay, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CursoResponse } from '../models/cursoResponse';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private readonly API = `${environment.API}curso`;

  constructor(private http: HttpClient) {}

  public get() {
    return this.http.get<CursoResponse[]>(this.API)
    // .pipe(
    //   delay(1000)
    // )
  }

  public getById(id: string) {
    return this.http.get(`${this.API}/${id}`)
    .pipe(
      take(1)
    );
  }


  public create (dados: any) {
    return this.http.post(this.API, dados).pipe(
      take(1)
    )
  }



}
