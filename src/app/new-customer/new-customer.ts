import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../model/Customer.model';
import {Router} from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule
  ],
  selector: 'app-new-customer',
  styleUrl: './new-customer.css',
  templateUrl: './new-customer.html',
})
export class NewCustomer implements OnInit{
  newCustomerformGroup! : FormGroup ;
  formBuilder: FormBuilder = inject(FormBuilder);
  customerService: CustomerService = inject(CustomerService);
  router: Router = inject(Router);
  ngOnInit(): void {
    this.newCustomerformGroup = this.formBuilder.group({
      name: this.formBuilder.control(null, [
        Validators.required,
        Validators.minLength(4),

      ]),
      email: this.formBuilder.control(null, [
        Validators.email,
        Validators.required
      ])
    });
  }

//  ng
  protected handlerSaveCustomer() {
    console.log("stop");
    let customer: Customer =  this.newCustomerformGroup.value;
    this.customerService.saveCustomers(customer).subscribe({
      next : data => {
        alert("Customer has been successfully saved!");
        this.newCustomerformGroup.reset();
        this.router.navigateByUrl("/customers");
      },
      error: err => {
        alert("error: "+err);
      }
    });
  }
}
