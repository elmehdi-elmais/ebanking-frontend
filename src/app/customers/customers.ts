import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from '../services/customer.service';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {BehaviorSubject, catchError, map, Observable, of, shareReplay, throwError} from 'rxjs';
import {Customer} from '../model/Customer.model';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'; // 👈 1. Importer JsonPipe

@Component({
  imports: [JsonPipe, AsyncPipe, ReactiveFormsModule], // 👈 2. L'ajouter dans le tableau imports
  selector: 'app-customers',
  styleUrl: './customers.css',
  templateUrl: './customers.html',
})
export class Customers implements OnInit{

//  customers!: Observable<Array<Customer>>;
  customers = new BehaviorSubject<Customer[]>([]);
  errorMessage: string | undefined;
  searchFormGroup!: FormGroup | undefined;
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);
   ngOnInit(): void {

    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
   });
    this.customerService.getCustomers().pipe(
      catchError( err=> {
        this.errorMessage = err.message;
        return of([]);

      })
    ).subscribe(data => {
      this.customers.next(data);
    });
    /*
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        console.log('Données :', data);
        //this.customers=data;
        this.customers.set(data);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
     */
  }

  handleSearchCustomers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return of([]);
      })
    ).subscribe(data => {
      // Met à jour la mémoire avec les données reçues
      this.customers.next(data);
    });
  }
  handleDeleteCustomer(c: Customer) {
    const conf = confirm("Are you sure?");
    if (!conf) return;

    this.customerService.deleteCustomer(c).subscribe({
      next: () => {

        const currentList = this.customers.getValue();

        const updatedList = currentList.filter(cust => cust.id !== c.id);

        this.customers.next(updatedList);



      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });


     /*
   this.customerService.deleteCustomer(c).subscribe({
     next: (data) => {
       this.handleSearchCustomers();
     },
     error: (err) => {
       alert(err);
     }
   });
    */
  }
}
