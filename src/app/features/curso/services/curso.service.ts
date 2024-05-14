import { Injectable } from '@angular/core';
import { delay, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICurso } from '../models/Icurso';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private readonly API = `${environment.API}curso`;

  constructor(private http: HttpClient) {}

  public get() {
    return this.http.get<ICurso[]>(this.API)
    // .pipe(
    //   delay(1000)
    // )
  }

  public create (dados: any) {
    return this.http.post(this.API, dados).pipe(
      take(1)
    )
  }



}
