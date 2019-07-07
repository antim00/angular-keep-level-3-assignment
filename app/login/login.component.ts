import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from './user';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    // username = new FormControl();
    // password = new FormControl();
    username = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]));
    password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]));
    user: User;
    submitMessage: string;
    constructor(private authservice: AuthenticationService,
      private routeService: RouterService) {
        this.submitMessage = '';
    }
    loginSubmit() {
      this.user = {
          username: this.username.value,
          password: this.password.value
      };
      this.authservice.authenticateUser(this.user).subscribe(
          res => {
              this.authservice.setBearerToken(res['token']);
              this.routeService.routeToDashboard();
          },
          err => {
              if (err.status === 403) {
                  this.submitMessage = err.error.message;
              } else if (err.status === 0) {
                  this.submitMessage = '';
              } else {
                  this.submitMessage = err.message;
              }
          }
      );
  }
  getuserNameErrorMessage() {
    if (this.username.touched && this.username.hasError('required')) {
        return 'Username is required';
    } else if (this.username.touched && this.username.hasError('minlength')) {
        return 'Username is invalid';
    }
}
getPasswordErrorMessage() {
    if (this.password.touched && this.password.hasError('required')) {
        return 'Password is required';
    } else if (this.password.touched && this.password.hasError('minlength')) {
        return 'Password is invalid';
    }
}
}
