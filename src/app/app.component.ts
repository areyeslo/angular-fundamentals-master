import { Component } from '@angular/core';

import { User } from './auth-form/auth-form.interface';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthRememberComponent } from './auth-form/auth-remember.component';

@Component({
  selector: 'app-root',
  imports: [AuthFormComponent, AuthRememberComponent],
  standalone: true,
  template: `
    <div>
      <auth-form (submitted)="loginUser($event)">
        <h3>Login</h3>
        <auth-remember (checked)="rememberUser($event)"> </auth-remember>
        <button type="submit">Login</button>
      </auth-form>
    </div>
  `,
})
export class AppComponent {
  rememberMe: boolean = false;

  createUser(user: User) {
    console.log('Create account', user);
  }

  loginUser(user: User) {
    console.log('Login', user, this.rememberMe);
  }

  rememberUser(remember: boolean) {
    this.rememberMe = remember;
  }
}
