import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product.interface';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'stock-selector',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  template: `
    <div class="stock-selector" [formGroup]="parent">
      <div formGroupName="selector">
        <select formControlName="product_id">
          <option value="">Select stock</option>
          <!-- Value is property binding to bind the value of 'product.id' to the 'value' attribute
          of the <option> element -->
          <option *ngFor="let product of products" [value]="product.id">
            {{ product.name }}
          </option>
        </select>
        <input
          formControlName="quantity"
          type="number"
          step="10"
          min="10"
          max="1000"
        />
        <button type="button" (click)="onAdd()">Add stock</button>
      </div>
    </div>
  `,
  styleUrl: './stock-selector.component.scss',
})
export class StockSelectorComponent {
  @Input() parent!: FormGroup;
  @Input() products!: Product[];

  @Output() added = new EventEmitter<any>();

  onAdd() {
    //Gives the value for the entire group so this will contain the product_id and quantity
    //Passing the value selected by the user (product_id and quantity)
    console.log('onAdd emitting: ', this.parent?.get('selector')?.value);
    this.added.emit(this.parent?.get('selector')?.value);
  }
}
