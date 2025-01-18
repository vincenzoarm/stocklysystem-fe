import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  baseUrl = 'http://localhost:8080/StocklySystem/api/';

  constructor(private http: HttpClient) {}

  getGeneralData() {
    return this.http.get(this.baseUrl + 'getCategoryAndProduct');
  }
}
