import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoantypesComponent } from './loantypes/loantypes.component';
import { LoanlendingComponent } from './loanlending/loanlending.component';
import { UserloanlistComponent } from './userloanlist/userloanlist.component';
import { LoandetailviewComponent } from './loandetailview/loandetailview.component';
import { EditloanComponent } from './editloan/editloan.component';

const routes: Routes = [
  {path:"loantype",component:LoantypesComponent},
  {path:"loanlending",component:LoanlendingComponent},
  {path:"userlist",component:UserloanlistComponent},
  {path:"viewdetail",component:LoandetailviewComponent},
  // {path:"edit",component:EditloanComponent},
  { path: 'edit-loan/:id', component: EditloanComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
