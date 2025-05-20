import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { AuthService } from '../../services/auth-service';
import { AuthUrls, InternalUrls } from '../../constants/api-urls';

@Component({
  selector: 'component-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatButton,
    HttpClientModule,
    ErrorModalComponent,
    SuccessModalComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessages: string[] = [];
  showErrorModal = false;

  successMessage: string = '';
  showSuccessModal = false;

  @ViewChild('registerDialog') registerDialog!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  openRegisterModal() {
    this.loginForm.reset();
    this.showErrorModal = false;

    if (this.dialog.openDialogs.length === 0) {
      const dialogRef = this.dialog.open(this.registerDialog);

      dialogRef.afterClosed().subscribe(() => {
        this.registerForm.reset();
        this.showErrorModal = false;
        this.errorMessages = [];
      });
    }
  }

  onLogin() {
    this.showErrorModal = false;
    const { email, password } = this.loginForm.value;

    const headers = new HttpHeaders({
      'email': email,
      'password': password,
    });

    this.http.get<any>(AuthUrls.LOGIN, { headers })
      .subscribe({
        next: (response) => {
          const { token, type, name } = response;

          this.authService.saveAuthData(token, type, name);

          this.router.navigate([InternalUrls.REDIRECT_HOME]);
        },
        error: (err) => {

          if (err.status == 401 ) {
            console.log('Unauthorized');
            this.errorMessages = ["Usuário não cadastrado"]
            this.showErrorModal = true;
          }
        }
      });
  }

  onRegister() {
    this.showErrorModal = false;

    const { email, name, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.errorMessages = ['As senhas não coincidem!'];
      this.showErrorModal = true;
      return;
    }

    const headers = new HttpHeaders({
      'email': email,
      'password': password,
      'name': name,
    });

    this.http.post(AuthUrls.REGISTER, null, { headers, observe: 'response' })
      .subscribe({
        next: (response) => {
          if (response.status === 201) {
            this.successMessage = 'Usuário cadastrado com sucesso!';
            this.showSuccessModal = true;
            this.registerForm.reset();

            setTimeout(() => {
              this.showSuccessModal = false;
              this.dialog.closeAll();
              this.router.navigate(['/']);
            }, 3000);
          }
        },
        error: (err) => {

          if (err.status === 400 && err.error && err.error.detail) {
            this.errorMessages = err.error.detail;

          } else {
            this.errorMessages = ['Erro inesperado: ' + (err.error?.title || err.message)];
          }
          this.showErrorModal = true;
          return;
        }
      });
  }
}
