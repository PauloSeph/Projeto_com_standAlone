import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';
import { ICurso } from '../../models/Icurso';
import { CursoService } from '../../services/curso.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CursoResponse } from '../../models/cursoResponse';

@Component({
  selector: 'app-curso-detalhes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './cursoDetalhes.component.html',
  styleUrl: './cursoDetalhes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CursoDetalhesComponent {
  public cursos$?: Observable<CursoResponse[]>;
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
    console.log('test 2')
    this.getData();
  }

  public onRefresh() {
    this.getData();
  }

  onDelete(id: number) {
    console.log(id)
    // falta implementar
  }


  // navegacao para rota com ID
  public onEdit(id: number) {
    this.router.navigate(['curso', 'editar', id]);
  }
 }
