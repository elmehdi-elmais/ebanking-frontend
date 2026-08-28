import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule
  ],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnInit{
    formLogin!: FormGroup ;
    private formBuilder: FormBuilder = inject(FormBuilder);
    private auth: AuthService = inject(AuthService);
    private router: Router = inject(Router);
    ngOnInit(): void {
      this.formLogin=this.formBuilder.group({
        "username": this.formBuilder.control("user1"),
        "password": this.formBuilder.control("1234")
      });

    }


  protected handleFormLogin() {
      let username = this.formLogin.controls["username"].value;
      let password = this.formLogin.controls["password"].value;
      this.auth.login(username, password).subscribe({
        next: (data) => {
          console.log(data);
          this.auth.loadProfile(data);
          this.router.navigateByUrl("/admin");
        }
      });
    console.log("stop", username, password);
  }
}
