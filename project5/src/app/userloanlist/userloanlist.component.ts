import { Component } from '@angular/core';
import { LoanService } from '../loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userloanlist',
  templateUrl: './userloanlist.component.html',
  styleUrl: './userloanlist.component.css'
})
export class UserloanlistComponent {
  users: any[] = [];
  loanId: string | null = null;
  userLoan: any = {};
  loandetails: any[] = [];

  constructor(private loanService: LoanService ,private router:Router) { }

  ngOnInit(): void {
    this.loadLoans();
    this.loanService.getUserLoans().subscribe(res =>{
      this.users=res;
      console.warn(this.users);
      
    
    })
    
 


  }

  loadLoans(): void {
    this.loanService.getUserLoans().subscribe(
      (data: any[]) => {
        this.users = data.map(user => ({
          ...user,
          dob: this.formatDate(user.dob),
          loanType: this.formatText(user.loanType),
          timeInMonths:user.loanDetails.timeInMonths,
          simpleInterest: user.loanDetails.simpleInterest,
          totalAmount: user.loanDetails.totalAmount
        }));
      },
      error => {
        console.error('Error fetching loan details', error);
      }
    );
  }

  formatDate(date: string): string {
    const [day, month, year] = date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    return dateObj.toLocaleDateString('en-GB', options);
  }

  formatText(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  editUser(){
    this.router.navigate(['/edit']);
  }


}
