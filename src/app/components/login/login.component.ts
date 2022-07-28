import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from '../navigation/authGuard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin?: boolean;

  loginFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authGuard: AuthGuard,
    private toastr: ToastrService
  ) { 
    this.loginFormGroup = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  loginUser() {
    this.authService.login(this.loginFormGroup.value)
      .subscribe(data => {
        const token = (<any>data).token;
        localStorage.setItem("jwt-token", token);
        this.invalidLogin = false;
        this.toastr.success('ExamRoom', 'Login Successful!');
        this.router.navigate(['notes']);
      }, error => {
        this.invalidLogin = true;
        console.log(error);
      });
  }

  isUserAuthenticated() {
    return this.authGuard.isUserAuthenticated();
  }
}
