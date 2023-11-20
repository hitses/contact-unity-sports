import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  fb = inject(FormBuilder);

  formSubmitted: boolean = false;
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  phonePattern: string = '^[0-9]{9}$';
  loading: boolean = false;
  selectedOption!: string;

  contactForm: FormGroup = this.fb.group({
    goal: [
      ,
      [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    ],
    achievement: [
      ,
      [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    ],
    acquaintance: [
      ,
      [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    ],
    worth: [, [Validators.required]],
    name: [
      ,
      [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    ],
    surname: [
      ,
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    phone: [, [Validators.required, Validators.pattern(this.phonePattern)]],
    mail: [, [Validators.required, Validators.pattern(this.emailPattern)]],
  });

  validField(field: string) {
    return (
      this.contactForm.controls[field].errors &&
      this.contactForm.controls[field].touched
    );
  }

  send() {
    console.log(this.contactForm.value);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.formSubmitted = true;
    }, 2000);
  }
}
