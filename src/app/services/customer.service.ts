import {inject, Inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/Customer.model';
import {environment} from '../../environments/environment.development';

@Service()

export class CustomerService {
  private http = inject(HttpClient);


  public getCustomers():Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.backendHost + "/api/customers");
  }

  public searchCustomers(kw: string):Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.backendHost + "/api/customers/search?keyword="+kw);
  }

  public saveCustomers(customer: Customer):Observable<Customer> {
    return this.http.post<Customer>(environment.backendHost + "/api/customers", customer);
  }
  public deleteCustomer(customer: Customer) {
    return this.http.delete<Customer>(environment.backendHost + "/api/customers/"+customer.id);
  }

}
