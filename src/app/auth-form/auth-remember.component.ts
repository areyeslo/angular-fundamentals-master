import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'auth-remember',
  standalone: true,
  template: `
    <label>
      <input type="checkbox" (change)="onChecked($event)" />
      Keep me logged in
    </label>
  `,
  styles: ``,
})
export class AuthRememberComponent {
  @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChecked(event: Event){
    const value = (event.target as HTMLInputElement).checked
    this.checked.emit(value);
  }
}
