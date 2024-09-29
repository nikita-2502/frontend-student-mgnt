import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = true;

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  getErrorMessage(conrtol: string) {
    let errMsg = '';

    if (conrtol === 'email') {
      if (this.loginForm.get('email')?.hasError('required')) {
        errMsg = 'You must enter a value';
      } else {
        errMsg = this.loginForm.get('email')?.hasError('email')
          ? 'Not a valid email'
          : '';
      }
    } else if (conrtol === 'password') {
      if (this.loginForm.get('password')?.hasError('required')) {
        errMsg = 'You must enter a value';
      } else {
        errMsg = this.loginForm.get('password')?.hasError('minlength')
          ? 'Password must contain 8 characters'
          : '';
      }
    }
    return errMsg;
  }

  onClick() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit() {
    // console.log(this.loginForm.value.email);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate(['dashboard']);
          }
        },
        error: (err) => {
          this.snackbar.open(err, '', { duration: 5000 });
        },
      });
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (res) => {
          if (res) {
            this.isLoginMode = true;
            this.router.navigate(['login']);
          }
        },
        error: (err) => {
          this.snackbar.open(err, '', { duration: 5000 });
        },
      });
    }
  }
}
