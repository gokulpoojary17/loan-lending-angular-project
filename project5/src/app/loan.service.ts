import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = 'http://localhost:3000/user_loans';

  constructor(private http: HttpClient) { }

  saveUserLoan(userLoan: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userLoan);
  }

  getUserLoans(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
 
  deleteLoan(id: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
 
  getUserLoan(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update a user loan
  updateUserLoan(id: string, updatedLoan: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedLoan);
  }
  

  calculateSimpleInterest(principal: number, rate: number, timeInMonths: number): number {
    const timeInYears = timeInMonths / 12;
    const simpleInterest = (principal * rate * timeInYears) / 100;
    return parseFloat(simpleInterest.toFixed(2));
  }

  // Method to calculate Total Amount with rounding
  calculateTotalAmount(principal: number, simpleInterest: number): number {
    const totalAmount = principal + simpleInterest;
    return parseFloat(totalAmount.toFixed(2));
  }
}
