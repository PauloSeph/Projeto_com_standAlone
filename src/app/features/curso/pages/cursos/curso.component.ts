import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CursoService } from '../../services/curso.service';
import { ICurso } from '../../models/Icurso';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.scss',
})
export class CursoComponent implements OnInit {

  public cursos$?: Observable<ICurso[]>;
  // public erro$ = new Subject<boolean>();
  public erro?: boolean;

  constructor(private curso: CursoService) { }

  ngOnInit(): void {
    this.cursos$ = this.curso.get()
    .pipe(
      catchError(
        () => {
          this.erro = true;
          return throwError(() => new Error('Falha na requisição'))
        }
      )
    )
  }

}
