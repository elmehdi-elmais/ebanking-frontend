import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '../services/auth.service';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit{
  public authService:AuthService = inject(AuthService);
  private router: Router = inject(Router);
  ngOnInit(): void {
   }
  protected handleLogout() {

    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
