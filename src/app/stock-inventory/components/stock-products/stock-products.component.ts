import { NgForOf } from '@angular/common'
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'stock-products',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  template: `
    <div class="stock-product" [formGroup]="parent">
      <div formArrayName="stock">
        <div *ngFor="let item of stocks; let i = index">
          <div [formGroupName]="i" class="stock-product __content">
            <div class="stock-product__name">
              {{ item.value.product_id }}
            </div>
            <input
              formControlName="quantity"
              type="number"
              step="10"
              min="10"
              max="1000"
            />
            <button type="button">Remove</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './stock-products.component.scss',
})
export class StockProductsComponent {
  @Input() parent!: FormGroup;

  get stocks() {
    return (this.parent.get('stock') as FormArray).controls;
  }
}
