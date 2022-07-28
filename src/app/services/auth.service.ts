import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:5000/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post<User>(baseUrl + "login", JSON.stringify(user), this.httpOptions);
  }
}
