import { Routes } from '@angular/router';
import { CursoComponent } from './features/curso/pages/cursos/curso.component';
import { HomeComponent } from './features/home/home.component';
import { FormCursoComponent } from './features/curso/pages/formCurso/formCurso.component';



export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'curso/detalhes', component: CursoComponent },
  { path: 'curso/cadastrar', component: FormCursoComponent },
  { path: 'curso/editar/:id', component: FormCursoComponent },

];
