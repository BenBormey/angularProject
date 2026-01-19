import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:5221/api/Category';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any[]>(this.apiUrl);
  }






  addCategory(data: any) {
  return this.http.post(this.apiUrl, data, { responseType: 'text' });
}

updateCategory(id: number, data: any) {
  return this.http.put(`${this.apiUrl}/${id}`, data, { responseType: 'text' });
}

deleteCategory(id: number) {
  return this.http.put(`${this.apiUrl}/${id}/Delete`, {}, { responseType: 'text' });
}


}
