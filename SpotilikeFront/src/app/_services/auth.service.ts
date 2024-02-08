import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/auth/api/login';

  constructor(private http: HttpClient) { }

  login(credentials : any): Observable<any>{
    return this.http.post(this.url,credentials)
  }
}
