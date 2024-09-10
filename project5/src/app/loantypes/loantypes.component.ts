import { Component } from '@angular/core';

@Component({
  selector: 'app-loantypes',
  templateUrl: './loantypes.component.html',
  styleUrl: './loantypes.component.css'
})
export class LoantypesComponent {

   // Array of loan types
   loanTypes: string[] = ['Personal Loan', 'Home Loan', 'Student Loan', 'Auto Loan'];

   constructor() { }
 
   ngOnInit(): void {
   }
}
