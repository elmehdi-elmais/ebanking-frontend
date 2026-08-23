import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from '../services/customer.service';
import {AsyncPipe, JsonPipe, NgIf} from '@angular/common';
import {catchError, Observable, of, throwError} from 'rxjs';
import {Customer} from '../model/Customer.model'; // 👈 1. Importer JsonPipe

@Component({
  imports: [JsonPipe, AsyncPipe, NgIf], // 👈 2. L'ajouter dans le tableau imports
  selector: 'app-customers',
  styleUrl: './customers.css',
  templateUrl: './customers.html',
})
export class Customers implements OnInit{

  customers!: Observable<Array<Customer>>;
  errorMessage: string | undefined;
  private customerService = inject(CustomerService);

  ngOnInit(): void {
    this.customers=this.customerService.getCustomers().pipe(
      catchError( err=> {
        this.errorMessage = err.message;
        return of([]);

      })
    );
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

}
