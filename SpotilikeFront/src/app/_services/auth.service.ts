import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredentials } from '../_interfaces/credential';
import { IToken } from '../_interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/auth/api/login';

  constructor(private http: HttpClient) { }

  login(credentials : ICredentials): Observable<IToken>{
    return this.http.post<IToken>(this.url,credentials)
  }
}
