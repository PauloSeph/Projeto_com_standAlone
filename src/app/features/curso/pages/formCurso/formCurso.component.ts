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
  private cursoService: CursoService = inject (CursoService)

  public submitted = false;

  ngOnInit() {
    this.cursoForm = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
        ],
      ],
      preco: [null, [Validators.required, Validators.maxLength(9)]],
    });
  }

  public onSubmit() {
    this.submitted = true;

    if (this.cursoForm.valid) {

      this.cursoService.create(this.cursoForm.value).subscribe(
        {
          next: (value) => console.log("sucesso"),
          error: (value) => console.log("erro"),
          complete: () => console.log("Requisição completa"),
        }
      )
    }
  }

  public onCancel() {
    this.submitted = false;
    this.cursoForm.reset();
  }

  public verificValidAndTouched(campo: any) {
    let invalid = this.cursoForm.get(campo)?.invalid;
    let touched = this.cursoForm.get(campo)?.touched;
    return invalid && touched;
  }

  public addClassError(campo: any) {
    return {
      'error': this.verificValidAndTouched(campo)
    };
  }

}
