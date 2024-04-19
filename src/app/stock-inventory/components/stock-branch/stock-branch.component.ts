import { Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: 'stock-branch',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <!-- Create a nested formGroup. Binding this component to the parent -->
    <!-- formGroup use property binding -->
    <div [formGroup]="parent">
      <!-- Assign formGroupName 'store' matching form.store defined in StockInventoryComponent -->
      <!-- formGroupName and formControlName using attribute binding -->
      <div formGroupName="store">
        <!-- Bind these controls to form.store.branch and form.store.code defined in StockInventoryComponent -->
        <input 
          type="text" 
          placeholder="Branch ID" 
          formControlName="branch" />
        <input 
          type="text" 
          placeholder="Manager Code" 
          formControlName="code" />
      </div>
    </div>
  `,
  styleUrl: './stock-branch.component.scss',
})
export class StockBranchComponent {
  // Variable parent pass information from the top.
  @Input() parent!: FormGroup;
}