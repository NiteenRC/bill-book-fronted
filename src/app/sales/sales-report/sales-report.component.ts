
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { SalesReportDetailsComponent } from '../sales-report-details/sales-report-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SalesOrderService } from 'src/app/_services/sales-order.service';
import { SalesOrderComponent } from '../salesoder/sales-order.component';
import { CustomerReportDetailsComponent } from '../customer-report-details/customer-report-details.component';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  displayedColumns: string[] = ['billDate', 'dueDate', 'customerName', 'totalPrice', 'amountPaid', 'currentDueAmount', 'totalDueAmount', 'Action', 'Print'];
  productColumns: string[] = ['id', 'productName', 'salesPrice', 'qtyOrdered'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  searchText: string;

  totalElements: number = 0;
  currentPage: number = 0;
  pageSize: number = 15;
  request = { page: this.currentPage, size: this.pageSize };

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  salesReports;

  constructor(public dialog: MatDialog, private salesOrderService: SalesOrderService, private router: Router) { }

  ngOnInit(): void {
    this.getSalesOrderList(this.request);
    this.range.valueChanges.subscribe(dateRange => {
      if (this.range.valid) {
        this.searchData();
      }
    })
  }

  getSalesOrderList(request): void {
      this.salesReports = [];
      this.salesOrderService.getSalesOrderList(request).subscribe(res => {
        this.salesReports = res['content'];
        this.totalElements = res['totalElements'];
        this._setData(res['content']);

        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = res.totalElements;
        });
      }, error => console.log(error));
    }

    nextPage(event: PageEvent) {
      const request = {};
      request['page'] = event.pageIndex.toString();
      request['size'] = event.pageSize.toString();

      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;

      this.getSalesOrderList(request);
      return event;
    }

  clearCustomerSearch() {
    this.searchText = '';
    this._setData(this.salesReports);
  }

  clearDate() {
    this.range.reset();
  }

  searchData() {
    const searchText = this.searchText;
    const { start, end } = this.range.value || {};

    let filteredData = null;

        if (searchText.length === 0) {
          this.currentPage = 0
          this.searchText = null;
        }

        filteredData = this.salesOrderService.getSalesOrderByCustomerName({ customerName: this.searchText, page: this.currentPage, size: this.pageSize }).subscribe(res => {
          this.salesReports = res['content'];
          this.totalElements = res['totalElements'];
          this._setData(res['content']);

          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = res.totalElements;
          });
        }, error => console.log(error));

    if (start && end) {
      const startTime = start.getTime();
      const endTime = end.getTime() + 86399999;
      // console.log('date===', startTime, endTime, new Date(startTime), new Date(endTime));
      filteredData = filteredData.filter(salesReport => {
        const dueDateTime = new Date(salesReport?.billDate).getTime();
        return dueDateTime >= startTime && dueDateTime <= endTime
      });
    }

    if (searchText) {
      filteredData = filteredData.filter(salesReport => salesReport?.customer?.customerName?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1);
    }
    this._setData(filteredData);
  }

  private _setData(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  deleteSalesOrder(event) {
    this.salesOrderService.deleteSalesOrder(event.salesOrderID).subscribe(
      response => {
        this.getSalesOrderList(this.request);
      },
      error => console.log(error));
  }

  getSalesOrder(event) {
    this.salesOrderService.getSalesOrder(event.salesOrderID).subscribe(
      response => {
        this._printPdf(response);
      },
      error => console.log(error));
  }

  private _printPdf(response) {
    const winHtml = `<a href="/dashboard/products" target="_blank"></a>`;
    const winUrl = URL.createObjectURL(
      new Blob([winHtml], { type: "text/html" })
    );

    const url = `/#/salesTable`;

    console.log("url ", url);
    const myWindow = window.open(url, "win", "width=800,height=600,left=250,right=150, nodeIntegration=no");
    console.log("response", response);
    console.log('this.response2', JSON.stringify((window['response'])));
    //myWindow.document.body.innerHTML
    
    //old
    //const url = `${location.origin}/praveen-traders/#salesTable`;
    //const url = `${location.origin}/#salesTable`;
    //const myWindow = window.open(url, "_blank", "width=800,height=600,left=250,right=150");
    myWindow['response'] = response;
  }

  updateProduct(updateProduct): void {
    const dialogRef = this.dialog.open(SalesReportDetailsComponent, {
      width: '950px',
      disableClose: false,
      data: { data: updateProduct }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getSalesOrderList(this.request);
    });
  }

  updateProduct1(updateProduct): void {
    const dialogRef = this.dialog.open(SalesOrderComponent, {
      width: '950px',
      disableClose: false,
      data: { data: updateProduct }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getSalesOrderList(this.request);
    });
  }

  supplierHistory(supplier): void {
    const dialogRef = this.dialog.open(CustomerReportDetailsComponent, {
      width: '950px',
      disableClose: false,
      data: { data: supplier }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.getPurchaseOrderList();
    });
  }
}
