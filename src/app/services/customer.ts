import {inject, Inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Service()

export class Customer {
  private http = inject(HttpClient);

  public getCustomers():Observable<any> {
    return this.http.get("http://localhost:8083/api/customers");
  }

}
