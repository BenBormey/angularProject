import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Branchservice {
  private apiURL = 'http://localhost:5221/api/Branch';

  constructor(private https: HttpClient) {}

  // GET ALL
  getBranch() {
    return this.https.get<any[]>(this.apiURL);
  }

  // ADD
  addBranch(data: any) {
    return this.https.post(this.apiURL, data, { responseType: 'text' });
  }

  // UPDATE
  updateBranch(data: any) {
    return this.https.put(this.apiURL, data, { responseType: 'text' });
  }

  // DELETE (your backend style)
  deleteBranch(branchId: number) {
    const url = `${this.apiURL}/Delete Branch`;
    return this.https.put(url, { branchId }, { responseType: 'text' });
  }
}
