import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';

import { StockBranchComponent } from "../../components/stock-branch/stock-branch.component";
import { StockSelectorComponent } from "../../components/stock-selector/stock-selector.component";
import { StockProductsComponent } from "../../components/stock-products/stock-products.component";
import { Product } from '../../models/product.interface'

@Component({
  selector: 'stock-inventory',
  standalone: true,
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <stock-branch [parent]="form"> </stock-branch>

        <stock-selector [parent]="form" [products]="products"> </stock-selector>

        <stock-products [parent]="form"> </stock-products>

        <div class="stock-inventory__buttons">
          <button type="submit" [disabled]="form.invalid">Order stock</button>
        </div>

        <pre>{{ form.value | json }}</pre>
      </form>
    </div>
  `,
  styleUrls: ['./stock-inventory.component.scss'],
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    StockBranchComponent,
    StockSelectorComponent,
    StockProductsComponent,
  ],
})
export class StockInventoryComponent {
  products: Product[] = [
    {
      id: 1,
      price: 100,
      name: 'Macbook Pro',
    },
    {
      id: 2,
      price: 10,
      name: 'USB-C-Adaptor',
    },
    {
      id: 3,
      price: 50,
      name: 'IPod',
    },
    {
      id: 4,
      price: 60,
      name: 'IPhone',
    },
    {
      id: 5,
      price: 50,
      name: 'Apple Watch',
    },
  ];

  form = new FormGroup({
    store: new FormGroup({
      branch: new FormControl(''),
      code: new FormControl(''),
    }),
    selector: new FormGroup({
      product_id: new FormControl(''),
      quantity: new FormControl(10),
    }),
    // Create a collection of FormControls or FormGroups
    stock: new FormArray([]),
  });

  onSubmit() {
    console.log('Submit:', this.form.value);
  }
}
