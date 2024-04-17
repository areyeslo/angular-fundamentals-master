import { Component, EventEmitter, Output } from '@angular/core';
import { User } from './auth-form.interface'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'auth-form',
  standalone: true,
  imports:[FormsModule],
  template: `
    <div class="auth-form">
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content></ng-content>
        <label>
          Email Address
          <input type="email" name="email" ngModel />
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  `,
})
export class AuthFormComponent {
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  onSubmit(value: User) {}
}
