import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { User } from './auth-form.interface';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';

@Component({
  selector: 'auth-form',
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
        <ng-content select="auth-remember"></ng-content>
        <auth-message
          #message
          [style.display]="showMessage ? 'inherit' : 'none'"
        >
        </auth-message>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `,
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {
  showMessage!: boolean;

  //Look up the component.
  @ContentChildren(AuthRememberComponent)
  rememberList!: QueryList<AuthRememberComponent>;

  //Query an element directly
  @ViewChild('email') email!: ElementRef

  //Angular resolve the query statically, during the component initialization, rather than
  //waiting until after the view has been created. It uses a template reference #message
  // @ViewChild('message', { static: true }) message!: AuthMessageComponent;
  @ViewChildren('message') message!: QueryList<AuthMessageComponent>;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  constructor(private cd:ChangeDetectorRef){}

  ngAfterViewInit(): void {
    // console.log(this.message);
    console.log(this.email)
    if (this.message) {
      this.message.forEach((message) => {
        message.days = 30;
      });
      this.cd.detectChanges();
    }
  }

  ngAfterContentInit(): void {
    if (this.rememberList) {
      this.rememberList.forEach((remember) =>
        remember.checked.subscribe((checked: boolean) => {
          this.showMessage = checked;
        })
      );
    }
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
