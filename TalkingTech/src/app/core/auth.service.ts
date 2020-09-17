import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Register, RegisterResponse, LoginResponse } from './../models/register.model';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  loginUser(email: string, password: string): Observable<LoginResponse>{
    const data = {email, password};
    return this.http.post<LoginResponse>(`${environment.API_Tt}/users/login/`, data);
  }
  createUser(data: Register): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.API_Tt}/users/signup/`, data);
  }
}
