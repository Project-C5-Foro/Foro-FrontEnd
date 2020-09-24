import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  toShow = true;

  @ViewChild('loginSwal') private loginSwal: SwalComponent;
  @ViewChild('ErrorSwal') private ErrorSwal: SwalComponent;
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }
  login(event: Event): void{
    event.preventDefault();
    if (this.form.valid){
      const value = this.form.value;
      this.authService.loginUser(value.email, value.password)
      .subscribe( data => {
        console.log(data);
        this.loginSwal.fire();
      }, () => {
        this.ErrorSwal.fire();
      });
    }else{
      this.ErrorSwal.fire();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  successfullogin(): void{
    this.router.navigate(['/home']);
  }
}
