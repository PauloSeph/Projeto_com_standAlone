import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CursoService } from '../services/curso.service';

export const cursoResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<any> => {

  if (route.params['id']) {
    let id = route.paramMap.get('id');
    return inject(CursoService).getById(id);
  }

  return of({
    nome: null,
    preco: null
  })

};

