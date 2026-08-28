import {inject, Service} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import {AppJwtPayload} from '../model/app-jwt-payload.model';

@Service()
export class AuthService {
  logout() {
      this.isAuth = false;
      this.accessToken = "";
      this.username = undefined;
      this.roles = [];
  }
  isAuth: boolean = false;
  roles: Array<string> = new Array<string>() ;
  username!: string | undefined;
  accessToken!: string;
  private http: HttpClient = inject(HttpClient);
  public login(username: string, password: string) {

    let options = {
      headers: new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Accept", "application/json")

    };
    let params = new HttpParams()
      .set("username", username)
      .set("password", password)
    ;

    return this.http.post("http://localhost:8083/auth/login",
        params,
        options
      );
  }

  loadProfile(data: any) {
    this.isAuth = true;
    this.accessToken = data["access-token"];
    let decodeJwt: AppJwtPayload = jwtDecode(this.accessToken);
    this.username = decodeJwt?.sub?.toString();
    this.roles = decodeJwt.scope ? decodeJwt.scope.split(' ') : [];
    window.localStorage.setItem("jwt-token", this.accessToken);
    console.log(this.roles);

    // this.roles = decodeJwt.scope;
  }
}
