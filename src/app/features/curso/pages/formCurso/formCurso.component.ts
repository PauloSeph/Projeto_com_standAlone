import { ICurso } from './../../models/Icurso';
import { CursoService } from './../../services/curso.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CursoResponse } from '../../models/cursoResponse';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-form-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formCurso.component.html',
  styleUrl: './formCurso.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCursoComponent implements OnInit {
  public cursoForm!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private cursoService: CursoService = inject(CursoService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  public submitted = false;

  // implementar a lógica, se for PUT usamos atualizar, se nao cadastrar.
  public cadastrarOuAtualizar = "Cadastrar"


  /* ### não precisamais desse codigo já que temos resolve ###  */

  // Método para popular formulario

  // public updateForm(curso: CursoResponse) {
  //   this.cursoForm.setValue({
  //     nome: curso.nome,
  //     preco: curso.preco
  //   })

  // }

  /* Obtendo o parametro da Rota e passando como argumento para
   o servico pra obter o Curso e em seguida populando o formulario
   com o metodo updateForm */

  // getUser() {
  //   this.route.paramMap.pipe(
  //     map(param => {
  //       return param.get('id')
  //     }),
  //     switchMap(id => {
  //       return this.cursoService.getById(id!)
  //     })
  //   ).subscribe( (curso) => {
  //     this.updateForm(curso as CursoResponse)
  //   })
  // }

  // Método chamado quando botão de submit é chamado
  // irá fazer a requisicao POST com os valores.



  public onSubmit() {

    this.submitted = true;

    if (this.cursoForm.valid) {
      console.log('Submit')

      // let msgSucesso = 'Curso Criado com sucesso';
      // let msgErro = 'Erro ao Criar curso, tente novamente';

      let curso = this.route.snapshot.data['curso']; //  Alternativa para obter ID = let id = this.route.snapshot.paramMap.get('id')

      // if (curso.id) {
      //   let msgSucesso = 'Curso Atualizado com sucesso';
      //   let msgErro = 'Erro ao Atualizar curso, tente novamente';
      // }

      // this.cursoService.save(curso.id, this.cursoForm.value).subscribe(
      //   {
      //     next: (value) => this.cursoForm.reset(),
      //     error: (value) => console.log(msgErro),
      //     complete: () => console.log('Requisição feita')
      //   }
      // )




      if (curso.id) {
        this.cursoService.atualizar(curso.id, this.cursoForm.value).subscribe(
          resposta => {
            console.log('Update realizado')
          }
        )
      } else {
        this.cursoService.create(this.cursoForm.value).subscribe(
          {
            next: (value) => console.log('sucesso'),
            error: (value) => console.log('erro'),
            complete: () => console.log('Requisição completa'),
          }
        )
      }
    }
  }






  // Serve para resetar o formulário e alterar o estado de submited para false.
  public onCancel() {
    this.submitted = false;
    this.cursoForm.reset();
  }

  // Verificando se o formulário é valido ou invalido
  public verificValidAndTouched(campo: any) {
    let invalid = this.cursoForm.get(campo)?.invalid;
    let touched = this.cursoForm.get(campo)?.touched;
    return invalid && touched;
  }

  // Metodo para aplicar uma classe CSS de acordo com a verificacao do metodo
  public addClassError(campo: any) {
    return {
      error: this.verificValidAndTouched(campo),
    };
  }

  // Inicializando o metodo e o getUser metodo para preencher o formulario.
  ngOnInit() {
    let curso = this.route.snapshot.data['curso'];

    this.cursoForm = this.formBuilder.group({
      nome: [curso['nome'],
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(3),
      ],
      ],
      preco: [curso['preco'], [Validators.required, Validators.maxLength(9)]],
    });

    // this.getUser();
  }
}
