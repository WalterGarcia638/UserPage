import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (success) => {
        this.loading = false;
        if (success) {
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: '¡Bienvenido!',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/homepage']);
          });
        } else {
          this.showErrorAlert('Credenciales incorrectas');
        }
      },
      error: () => {
        this.loading = false;
        this.showErrorAlert('Error al iniciar sesión. Intenta de nuevo.');
      },
    });
  }

  private showErrorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'Intentar de nuevo',
    });
  }
}