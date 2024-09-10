

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from '../loan.service';
import { PhoneNumberUtil } from 'google-libphonenumber';

@Component({
  selector: 'app-loanlending',
  templateUrl: './loanlending.component.html',
  styleUrls: ['./loanlending.component.css']
})
export class LoanlendingComponent {
  loanForm: FormGroup;
  loanTypes: string[] = ['Personal Loan', 'Home Loan', 'Auto Loan'];
  si: number = 0;
  totalAmount: number = 0;

  constructor(private fb: FormBuilder, private router: Router, private loanService: LoanService) {
    this.loanForm = this.fb.group({
      fullName: ['', [Validators.required, this.noSpacesValidator]],
      dob: ['', [Validators.required, this.dateFormatValidator]],
      comments: [''],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
      loanType: ['', Validators.required],
      principal: ['', [Validators.required, Validators.pattern('^[0-9]*\\.?[0-9]+$')]],
      rate: ['', [Validators.required, Validators.pattern('^[0-9]*\\.?[0-9]+$')]],
      time: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      loanDetails: this.fb.group({
        principal: [0, [Validators.required, Validators.min(0)]],
        rate: [0, [Validators.required, Validators.min(0)]],
        timeInMonths: [0, [Validators.required, Validators.min(0)]],
        simpleInterest: [0],
        totalAmount: [0],

      }),
      timeInMonths: [0, [Validators.required, Validators.min(0)]],
      simpleInterest:[0,[Validators.required, Validators.min(0)]],
      totalAmount:[0],
    });
  }


//monile no validations

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    const value = control.value;

    if (!value) {
      return null;
    }

    try {
      const number = phoneNumberUtil.parse(value, 'US'); // You can adjust the default region code as needed
      if (!phoneNumberUtil.isValidNumber(number)) {
        return { invalidPhoneNumber: true };
      }
    } catch (error) {
      return { invalidPhoneNumber: true };
    }

    return null;
  }


   // Custom validator for date format
   dateFormatValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // Regex for dd-mm-yyyy format
    const dateFormatRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (value && !dateFormatRegex.test(value)) {
      return { invalidDateFormat: true };
    }

    const [, day, month, year] = value.match(dateFormatRegex) || [];
    
    if (month && (parseInt(month, 10) < 1 || parseInt(month, 10) > 12)) {
      return { invalidMonth: true };
    }

    if (day && (parseInt(day, 10) < 1 || parseInt(day, 10) > 31)) {
      return { invalidDay: true };
    }
    if(year && (parseInt(year, 10) < 1 || parseInt(year)>2024)){
      return {invalidyear: true };
    }

    return null;
  }

  //space validations

  noSpacesValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && /\s/.test(value)) {
      return { noSpaces: true };
    }
    return null;
  }
  ngOnInit(): void { }

  calculateInterest(): void {
    if (this.loanForm.valid) {
      const loanDetails = this.loanForm.get('loanDetails')?.value || {};
      const principal = parseFloat(this.loanForm.get('principal')?.value) || 0;
      const rate = parseFloat(this.loanForm.get('rate')?.value) || 0;
      const timeInMonths = parseFloat(this.loanForm.get('time')?.value) || 0;
      const timeInYears = timeInMonths / 12;

      this.si = (principal * rate * timeInYears) / 100;
      this.totalAmount = this.si + principal;

      // Update loanDetails form group
      this.loanForm.patchValue({
        loanDetails: {
          principal: principal,
          rate: rate,
          timeInMonths: timeInMonths,
          simpleInterest: this.si,
          totalAmount: this.totalAmount
        },
        timeInMonths:timeInMonths,
        simpleInterest:this.si,
        totalAmount: this.totalAmount
      });

      console.log('Calculated interest details:', this.loanForm.get('loanDetails')?.value);
    } else {
      console.error('Form is invalid, cannot calculate interest');
    }
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
      this.calculateInterest();
      const userLoan = this.loanForm.value;
      this.loanService.saveUserLoan(userLoan).subscribe(response => {
        console.log('Loan saved:', response);
        this.router.navigate(['/userlist']);  // Adjust this to your actual loan listing route
      });
    }
  }

  saveLoan(): void {
    if (this.loanForm.valid) {
      this.calculateInterest();
      const userLoan = this.loanForm.value;
      this.loanService.saveUserLoan(userLoan).subscribe(response => {
        console.log('Loan saved:', response);
        this.router.navigate(['/userlist']);  // Adjust this to your actual loan listing route
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/userlist']);  // Adjust this to your actual loan listing route
  }
}
