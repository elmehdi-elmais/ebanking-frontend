import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import {appHttpInterceptor} from './interceptors/app-http-interceptor';
import {AuthService} from './services/auth.service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  providers: [
    //provideHttpClient(withInterceptors([appHttpInterceptor]))

]
})
export class App  implements OnInit{
  private authService: AuthService = inject(AuthService);
  ngOnInit(): void {
      this.authService.loadJwtTokenFromLocalStorage();
  }
  protected readonly title = signal('apps');
}
