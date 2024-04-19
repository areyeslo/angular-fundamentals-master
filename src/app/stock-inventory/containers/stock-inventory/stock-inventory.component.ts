import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';

import { StockBranchComponent } from "../../components/stock-branch/stock-branch.component";
import { StockSelectorComponent } from "../../components/stock-selector/stock-selector.component";
import { StockProductsComponent } from "../../components/stock-products/stock-products.component";
import { Product } from '../../models/product.interface';
import { StockItem } from '../../models/stock-item.interface'

@Component({
  selector: 'stock-inventory',
  standalone: true,
  template: `
    <div class="stock-inventory">
      <!-- Binding formGroup to variable form -->
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <!-- bind this component to the above formGroup refering to form in the class -->
        <stock-branch [parent]="form"> </stock-branch>
        <!-- bind this component to the above formGroup refering to form in the class -->
        <stock-selector [parent]="form" [products]="products"> </stock-selector>
        <!-- bind this component to the above formGroup refering to form in the class -->
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
    //This is the name of the form included in <form>
    store: new FormGroup({
      //This is a div grouping branch and code
      branch: new FormControl(''), //This is input in html template
      code: new FormControl(''), //This is input in html template
    }),
    // selector: this.createStock({}),
    selector: new FormGroup({
      product_id: new FormControl(''),
      quantity: new FormControl(10),
    }),
    // Collection of stock that we have added
    stock: new FormArray([
      this.createStock({product_id:1, quantity:10}),
      this.createStock({product_id:3, quantity:50})
    ]),
  });

  createStock(stock: StockItem){
    return new FormGroup({
      product_id: new FormControl(
        typeof stock.product_id === 'number'
          ? parseInt(stock.product_id.toString(), 10)
          : ''
      ),
      quantity: new FormControl(stock.quantity || 10),
    });
  }

  onSubmit() {
    console.log('Submit:', this.form.value);
  }
}
