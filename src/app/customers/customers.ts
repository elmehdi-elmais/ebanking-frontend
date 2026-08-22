import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../services/customer';
import { JsonPipe } from '@angular/common'; // 👈 1. Importer JsonPipe

@Component({
  imports: [JsonPipe], // 👈 2. L'ajouter dans le tableau imports
  selector: 'app-customers',
  styleUrl: './customers.css',
  templateUrl: './customers.html',
})
export class Customers implements OnInit{

  customers = signal<any[]>([]);
  errorMessage: string | undefined;
  private customerService = inject(Customer);

  ngOnInit(): void {
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
  }

}
