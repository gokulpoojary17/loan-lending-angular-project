import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoantypesComponent } from './loantypes/loantypes.component';
import { LoanlendingComponent } from './loanlending/loanlending.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DateFormatPipe } from './date-format.pipe';
import { FormatTextPipe } from './format-text.pipe';
import { UserloanlistComponent } from './userloanlist/userloanlist.component';
import { LoandetailviewComponent } from './loandetailview/loandetailview.component';
import { EditloanComponent } from './editloan/editloan.component';

@NgModule({
  declarations: [
    AppComponent,
    LoantypesComponent,
    LoanlendingComponent,
    DateFormatPipe,
    FormatTextPipe,
    UserloanlistComponent,
    LoandetailviewComponent,
    EditloanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
