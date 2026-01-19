import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Taxservice {
  private apiUrl = 'http://localhost:5221/api/Tax'; // change if needed

  constructor(private http: HttpClient) {}

  getTax(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTaxById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTax(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateTax(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteTax(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
