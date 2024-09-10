import { Component } from '@angular/core';
import { LoanService } from '../loan.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editloan',
  templateUrl: './editloan.component.html',
  styleUrl: './editloan.component.css'
})
export class EditloanComponent {

  loanId: string | null = null;
  userLoan: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private LoanService: LoanService,
  ) { }

  ngOnInit(): void {
    this.loanId = this.route.snapshot.paramMap.get('id');
    if (this.loanId) {
      this.LoanService.getUserLoan(this.loanId).subscribe(
        data => {
          this.userLoan = data;
          this.updateCalculations(); // Ensure calculations are done on initialization
        },
        error => console.error('Error fetching loan details', error)
      );
    }
  }

  updateCalculations(): void {
    const timeInYears = this.userLoan.loanDetails.timeInMonths / 12;
    this.userLoan.loanDetails.simpleInterest = this.LoanService.calculateSimpleInterest(
      this.userLoan.loanDetails.principal,
      this.userLoan.loanDetails.rate,
      timeInYears
    );
    this.userLoan.loanDetails.totalAmount = this.LoanService.calculateTotalAmount(
      this.userLoan.loanDetails.principal,
      this.userLoan.loanDetails.simpleInterest
    );
  }

  save(): void {
    if (this.loanId) {
      console.warn(this.userLoan);
      
      this.LoanService.updateUserLoan(this.loanId, this.userLoan).subscribe(
        () => this.router.navigate(['/userlist']),
        error => console.error('Error updating loan details', error)

      );
    }
    this.router.navigate(['/userlist'])

  }
}

 
