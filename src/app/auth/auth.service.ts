import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from './login-response';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStatus = new BehaviorSubject<boolean>(false);
  authStatus = this._authStatus.asObservable();

  constructor(private http: HttpClient) { }

  private setAuthStatus (value: boolean){
    this._authStatus.next(value)
  }

  login(loginRequest: LoginRequest) : Observable<LoginResponse>{
    let url = `${environment.baseUrl}api/Admin/Login`;
    return this.http.post<LoginResponse>(url,loginRequest)
    .pipe(tap(result =>{
      if(result.success){
        localStorage.setItem("JwtToken_CityCountry", result.token);
        this.setAuthStatus(true);
      }
    }));
  }
  logout(){
    localStorage.removeItem("JwtToken_CityCountry");
    this.setAuthStatus(false);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("JwtToken_CityCountry") != null;
  }
}
