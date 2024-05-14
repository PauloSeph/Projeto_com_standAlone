import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CursoService } from '../../services/curso.service';
import { ICurso } from '../../models/Icurso';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.scss',
})
export class CursoComponent implements OnInit {
  public cursos$?: Observable<ICurso[]>;
  // public erro$ = new Subject<boolean>();
  public erro?: boolean;

  private router: Router = inject(Router);
  private curso: CursoService = inject(CursoService);


  /* Lembrando que só vamos consumir os dados do Observavél
    quando chamarmos o subscribe. Ou seja, com o Pipe.
  */
  getData() {
    this.cursos$ = this.curso.get().pipe(
      catchError(() => {
        this.erro = true;
        return throwError(() => new Error('Falha na requisição'));
      })
    );
  }

  ngOnInit(): void {
    this.getData();
  }

  public onRefresh() {
    this.getData();
  }

  public onEdit(id: number) {
    this.router.navigate(
      ['curso', 'editar', id]
  );
}
}
