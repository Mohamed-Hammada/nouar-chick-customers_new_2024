import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LanguageService } from '../../_helper/language.service';
import { DataService } from '../../_helper/data.service';
import { CustomeSearchComponent } from "../../components/custome-search/custome-search.component";
import { FinancialTransactionResponse, FinancialTransactionService } from './financial-transaction.service';
import { NotificationService } from '../../components/notification.service';
import { ConfirmationDialogService } from '../../components/confirmation-dialog/confirmation-dialog.service';
import { Customer } from '../customers/customers.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { CreateUpdateCustomersComponent } from "../customers/create-update-customers/create-update-customers.component";



@Component({
  selector: 'app-financial-transaction',
  standalone: true,
  templateUrl: './financial-transaction.component.html',
  styleUrl: './financial-transaction.component.scss',
  imports: [CommonModule, MatIconModule, MatListModule,
    MatCardModule, MatToolbarModule, MatButtonModule,
    CustomeSearchComponent, CreateUpdateCustomersComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FinancialTransactionComponent implements OnInit {
  customerForm!: FormGroup;

  customer: Customer = {};
  cards$!: Observable<FinancialTransactionResponse>;



  constructor(private service: FinancialTransactionService,
    private fb: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private notificationService: NotificationService,
    private router: Router,
    private languageService: LanguageService,
    private dataService: DataService) {
    if (this.dataService.data)
      this.customer = this.dataService.data.content;
    this.languageService.setDefaultLanguage();

  }
  ngOnInit(): void {
    this.initForm();

    this.loadData();

  }

  initForm(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    this.customerForm = this.fb.group({
      id: [this.customer.id], // You can set default values or leave them empty
      code_id: [this.customer.code_id],
      name: [this.customer.name],
      start: [yesterday],
      end: [today]
    });
  }




  // In your component class
  myTrackByFunc(index: number, card: any): number {
    return card.id; // Assuming 'id' is a unique identifier for each card
  }

  addChildHandler(card?: any, readOnly: boolean = false): void {
    if (card) {
      this.dataService.setData({ readOnly: readOnly, customer: this.customer, content: card });
    } else {
      this.dataService.setData({ readOnly: readOnly, customer: this.customer });
    }
    this.router.navigate(['/create-update-financial']);
  }

  delete(card: any): void {
    this.service.deleteFinancialTransaction(card.id).subscribe(response => {
      this.loadData();
      // Handle update success
      this.notificationService.success('Customer Deleted successfully');
    }, error => {
      // Handle update error
      console.error('Delete failed:', error);
      this.notificationService.error('Delete failed');
    });
  }

  handleDelete(card: any): void {
    this.confirmationDialogService
      .openConfirmationDialog('Deleting the product will also delete associated customer records. Exercise caution before proceeding?')
      .subscribe((result) => {
        if (result) {
          // User confirmed deletion, proceed with delete
          this.delete(card);
        }
      });

  }
  loadData() {    // Custom validation for fromDate and toDate
    const fromDate = this.customerForm?.get('start')?.value as Date;
    const toDate = this.customerForm?.get('end')?.value as Date;

    if (fromDate && toDate && fromDate > toDate) {
      // Handle validation error, for example, show an error message
      console.log("Validation Error: From Date must be less than or equal to To Date");
      this.notificationService.error('Date From Must be less than or equal to Date To');

    } else {
      // Proceed with the load action logic
      // ...
      console.log("Load Action Executed");
      this.cards$ = this.service.getFinancialTransactions(this.customer?.id, fromDate, toDate);
    }
  }

  public openPrinterWindow() {
    const fromDate = this.customerForm?.get('start')?.value as Date;
    const toDate = this.customerForm?.get('end')?.value as Date;
    this.cards$.subscribe((financialTransactionPage: FinancialTransactionResponse) => {
      // Call the function with the actual value and other parameters
      this.prepareTableForPrint(financialTransactionPage, fromDate, toDate);
    });
  }

  printItNew(printThis: any) {


    var win = window.open();
    self.focus();



    var html = "<!DOCTYPE html>";
    html += '<html>';
    html += '<head>';
    // html += '<title>طباعه فاتوره</title>';
    html += '<style>';
    html += 'table {';
    html += 'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;';
    html += 'border: 1px solid #1C6EA4;';
    html += 'width: 100%;';
    html += 'text-align: center;';
    //html += 'background-color: #EEEEEE;';
    //html += 'border-collapse: collapse;';
    html += '}';

    //  html += 'tr:nth-child(even) {';
    // html += 'text-shadow: 2px 2px 5px ;';
    // html += '}';


    html += '</style></head>';
    html += "<body>";
    html += printThis
    html += "</body>";
    win?.document.write(html);
    win?.window.print();
    win?.document.close();


  }



  prepareTableForPrint(financialTransactionResponse: FinancialTransactionResponse
    , dateFrom: Date, dateTo: Date) {

    let s: string[] = [];
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    let formatter2 = new Intl.NumberFormat('en-US');

    let currentDateFormatted = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    s.push(
      "<table background-color: #EEEEEE; align=\"center\" style=\" height: 68px; padding: 8px; border-bottom: 1px solid #ddd; border: 1px solid #ddd; border-collapse: collapse;\" border=\"0\">");
    s.push("<tbody>");


    s.push("<tr  font-size=\"18px;\" style=\" border-bottom: 1px solid #dddddd; height: 3px;\">");
    s.push("<td style=\"width: 20px; text-align: center; height: 4px;\" colspan=\"3\">");
    s.push("<strong>");
    s.push("مؤسسه نوار لتجاره جميع انواع البيض والكتاكيت");
    s.push("</strong>");
    s.push("</td>");
    s.push("</tr>");

    s.push("<tr style=\"border-bottom: 1px solid #dddddd; height: 18px;\">");
    s.push("<td style=\"width: 20px; height: 18px;\">P.Date&nbsp;&nbsp;</td>");
    s.push("<td style=\"text-align: left;width: 25px; height: 18px;\">"
      +
      currentDateFormatted
      + "</td>");
    s.push("<td style=\"width: 164px; height: 54px; text-align: right;\" rowspan=\"3\">&nbsp;&nbsp;&nbsp;"
      + this.customer.code_id + "&nbsp;&nbsp; : " + "كود العميل   &nbsp; &nbsp;&nbsp;</td>");
    s.push("</tr>");
    s.push("<tr style=\"border-bottom: 1px solid #dddddd; height: 18px;\">");
    s.push("<td style=\"width: 20px; height: 18px;\">&nbsp;&nbsp;&nbsp;&nbsp;From Date</td>");
    s.push("<td style=\"text-align: left; width: 25px; height: 18px;\">" +
      dateFrom.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })


      + "</td>");
    s.push("</tr>");
    s.push("<tr style=\"border-bottom: 1px solid #dddddd; height: 18px;\">");
    s.push("<td style=\"width: 20px; height: 18px;\">To Date</td>");
    s.push("<td style=\"text-align: left;width: 25px; height: 18px;\">"
      + dateTo.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })

      + "</td>");
    s.push("</tr>");
    s.push("<tr font-size=\"16px;\" style=\"border-bottom: 1px solid #dddddd; height: 3px;\">");
    s.push("<td style=\"width: 20px; text-align: center; height: 3px;\" colspan=\"3\">");


    s.push("اسم العميل " + " : ");
    s.push(this.customer.name || '');
    s.push("</td>");
    s.push("</tr>");
    s.push("</tbody>");
    s.push("</table>");



    // table
    s.push("<table border=\"1px solid #1C6EA4;\"  ><tbody>");

    s.push("<tr font-size=\"14px;\" border-top = \" 3px solid #444444;\"  bgcolor=\"#FEFAFD\">");
    s.push("<td  style=\"text-align: center;\" colspan=\"2\">&nbsp; الرصيد</td>");
    s.push("<td colspan=\"7\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>");
    s.push("</tr>");

    // real header
    // s.push( "<tr bgcolor=\"#CDCECD;\" border-top = \" 3px solid #444444\" >");

    s.push("<thead>");

    s.push("<tr style=\" font-size=\"14px;\" border-top = \" 3px solid #444444;\"  bgcolor=\"#FEFAFD\">");

    s.push("<th style=\"text-align: center;\">له</th>");
    s.push("<th style=\"text-align: center;\">عليه</th>");
    s.push("<th style=\"text-align: center;\">له</th>");
    s.push("<th style=\"text-align: center;\">عليه</th>");
    s.push("<th style=\"text-align: center;\">السعر</th>");
    s.push("<th style=\"text-align: center;\">عدد</th>");
    s.push("<th style=\"text-align: center;\">الصنف</th>");
    s.push("<th style=\"text-align: center;\">البيان</th>");
    s.push("<th style=\"text-align: center;\">التاريخ</th>");
    s.push("</tr>");
    s.push("</thead>");
    let i = 0;
    let var0 = "";
    for (const accountableDTON of financialTransactionResponse.content || []) {


      i++;
      if (accountableDTON.statement?.name?.includes("مشتريات")) {

        s.push("<tr  " + var0 + " font-size=\"14px;\" border-top = \" 3px solid #444444;\"  >");
      } else if (accountableDTON.statement?.name?.includes("مبيعات")) {
        s.push("<tr " + var0
          + " font-size=\"14px;\" border-top = \" 3px solid #444444;\"  bgcolor=\"#D3FCD5\">");
      } else {
        s.push("<tr " + var0
          + " font-size=\"14px;\" border-top = \" 3px solid #444444;\"  bgcolor=\"#cee0ed\">");
      }

      s.push("<td style=\"text-align: center;\">");

      s.push(formatter.format(accountableDTON.total_stock || 0));
      s.push("</td>\n" + "<td style=\"text-align: center;\">");

      s.push(formatter.format(accountableDTON.total_borrower || 0));
      s.push("</td>\n" + "<td style=\"text-align: center;\">");

      s.push(formatter.format(accountableDTON.stock || 0));
      s.push("</td>\n" + "<td style=\"text-align: center;\">");

      s.push(formatter.format(accountableDTON.borrower || 0));
      s.push("</td>\n" + "<td style=\"text-align: center;\">");
      s.push(formatter.format(accountableDTON.price || 0));
      s.push("</td>\n" + "<td style=\"text-align: center;\">");

      s.push(formatter2.format(accountableDTON.count || 0));
      s.push("</td>\n" + "<td style=\"text-align: center;\">");
      s.push(accountableDTON.product?.name || '');
      s.push("</td>\n" + "<td style=\"text-align: center;\">");
      s.push(accountableDTON.statement?.name || '');

      s.push("</td>\n" + "<td style=\"text-align: center;\">");
      s.push(accountableDTON.creation_date || '');
      s.push("</td>\n" + "</tr>\n" + "  ");

    }

    s.push("<tr bgcolor=\"#CDCECD\">");
    s.push("<td>" + formatter.format(financialTransactionResponse.total_stock_on_final || 0) + "</td>");
    s.push("<td style=\"text-align: center;\">" + financialTransactionResponse.footer_value + "</td>");
    s.push("<td style=\"text-align: center;\">" + formatter.format(financialTransactionResponse.total_stock_on_period || 0)
      + "</td>");
    s.push("<td style=\"text-align: center;\">" + formatter.format(financialTransactionResponse.total_borrower_on_period || 0)
      + "</td>");
    s.push("<td style=\"text-align: center;\" colspan=\"5\">&nbsp;اجمالى حركه الفاتوره</td>");
    s.push("</tr>");

    /// last row
    s.push("<tr style=\"\" font-size=\"14px;\" border-top = \" 3px solid #444444;\"  bgcolor=\"#CDCECD\">");


    s.push("<td>" + formatter.format(financialTransactionResponse.total_stock_on_final || 0) + "</td>");
    s.push("<td style=\"text-align: center;\">&nbsp;" + financialTransactionResponse.footer_value + "&nbsp;</td>");
    s.push("<td style=\"text-align: center;\" colspan=\"2\">الرصيد الحالى</td>");
    s.push("<td colspan=\"5\">&nbsp;</td>");
    s.push("</tr>");
    // s.push("</tfoot>");

    s.push("</tbody>");
    s.push("</table>");

    return s.toString().replaceAll("\n", " ");
  }


}
