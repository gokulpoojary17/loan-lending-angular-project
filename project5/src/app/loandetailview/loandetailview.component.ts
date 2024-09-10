import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-loandetailview',
  templateUrl: './loandetailview.component.html',
  styleUrl: './loandetailview.component.css'
})
export class LoandetailviewComponent {


  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService,
    private router: Router,
  ) { }

  
  users: any[] = [];


  ngOnInit(): void {
    this.loadLoans();
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
  deleteLoan(index: number) {
    // Delete the user at the given index
    alert('are u sure')
    this.users.splice(index, 1);
  }


  goBack(): void {
    this.router.navigate(['/userlist']);
  }
}
