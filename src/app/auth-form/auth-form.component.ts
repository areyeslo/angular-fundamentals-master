import { Component, EventEmitter, Output, ContentChild, AfterContentInit, contentChild } from '@angular/core';
import { User } from './auth-form.interface'
import { FormsModule } from '@angular/forms'
import { NgIf } from '@angular/common'

import { AuthRememberComponent } from './auth-remember.component'

@Component({
  selector: 'auth-form',
  standalone: true,
  imports: [FormsModule, NgIf, AuthRememberComponent],
  template: `
    <div class="auth-form">
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email Address
          <input type="email" name="email" ngModel />
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel />
        </label>
        <ng-content select="auth-remember"></ng-content>
        <div *ngIf="showMessage">
          You will be logged in for 30 days
        </div>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `,
})
export class AuthFormComponent implements AfterContentInit{
  showMessage!: boolean;

  //Look up the component.
  @ContentChild(AuthRememberComponent) remember!: AuthRememberComponent
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  ngAfterContentInit(): void {
    if(this.remember){
      this.remember.checked.subscribe((checked:boolean)=> {
        this.showMessage = checked
      })
    }
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
