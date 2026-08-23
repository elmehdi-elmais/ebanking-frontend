import {inject, Inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/Customer.model';

@Service()

export class CustomerService {
  private http = inject(HttpClient);

  public getCustomers():Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>("http://localhost:8083/api/customers");
  }

}
