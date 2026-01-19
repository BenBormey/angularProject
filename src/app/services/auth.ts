import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:5221/api/User';
  
  constructor(private http: HttpClient) { }

   login(data : any) {
    return this.http.post(`${this.apiUrl}/login`, data);
   }
    register(data : any) {
      return this.http.post(`${this.apiUrl}`, data);
    }

    }
   