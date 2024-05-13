import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-curso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './formCurso.component.html',
  styleUrl: './formCurso.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCursoComponent implements OnInit {

  public cursoForm!: FormGroup;

  private formBuilder = inject(FormBuilder);


  ngOnInit() {
    this.cursoForm = this.formBuilder.group({
      nome: [null,
        [Validators.required, Validators.maxLength(30), Validators.minLength(3)]
      ],
      preco: [null,
        [Validators.required, Validators.maxLength(9)]
      ]
    })
  }
}
