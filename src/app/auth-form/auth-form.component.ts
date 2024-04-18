import {
  Component,
  EventEmitter,
  Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { User } from './auth-form.interface';
import { AuthMessageComponent } from './auth-message.component';

@Component({
  selector: 'auth-form',
  styles: [
    `
    .email{
      border-color: #9f72e6
    }
    `
  ],
  standalone: true,
  imports: [FormsModule, NgIf, AuthMessageComponent],
  template: `
    <div class="auth-form">
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email Address
          <input type="email" name="email" ngModel #email/>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel />
        </label>
        <button type="submit">
          {{title}}
        </button>
      </form>
    </div>
  `,
})
export class AuthFormComponent {
  title = 'login';

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
