import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:5221/api/User';

  constructor(private http: HttpClient) {}

  // Get all users
  getUser() {
    return this.http.get<any[]>(`${this.url}/GetAllUser`);
  }

  // Create user
  saveUser(data: any) {
    return this.http.post(`${this.url}`, data);
  }

  // Update user
  updateUser(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  // ✅ Change Password
  changePassword(data: {
    userId: number;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: '*/*',
    });

    return this.http.put(
      `${this.url}/ChangePassword/${data.userId}?id=${data.userId}`,
      data,
      { headers }
    );
  }
}
