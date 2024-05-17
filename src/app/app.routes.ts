import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FormCursoComponent } from './features/curso/pages/formCurso/formCurso.component';
import { CursoDetalhesComponent } from './features/curso/pages/cursoDetalhes/cursoDetalhes.component';
import { CursoComponent } from './features/curso/curso.component';
import { cursoResolver } from './features/curso/resolver/curso-resolver.resolver';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'curso', component: CursoComponent, children: [
      { path: '', component: CursoDetalhesComponent },
      {
        path: 'cadastrar', component: FormCursoComponent,
        resolve: {
          curso: cursoResolver
        }
      },
      {
        path: 'editar/:id', component: FormCursoComponent,
        resolve: {
          curso: cursoResolver
        }
      },
    ]
  },
];


