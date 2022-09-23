import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from 'src/app/_services/company.service';
import { CustomerService } from 'src/app/_services/customer.service';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html',
    styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['customerName', 'window', 'phoneNumber', 'location', 'id'];
    dataSource;
    errorMsg: any;
    showMsg: boolean = false;

    constructor(public dialog: MatDialog, private customerService: CustomerService, private companyService: CompanyService) {
    }

    ngOnInit(): void {
        this.getCustomerList();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateCustomerComponent, {
            width: '550px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getCustomerList();
        });
    }

    updateCustomer(updateCustomer): void {
        const dialogRef = this.dialog.open(CreateCustomerComponent, {
            width: '550px',
            disableClose: true,
            data: { data: updateCustomer }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getCustomerList();
        });
    }

    getCustomerList() {
        this.customerService.getCustomerList().subscribe(data => {
            this.dataSource = data;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
        }, error => console.log(error));
    }

    deleteCustomer(event) {
        this.customerService.deleteCustomer(event.id).subscribe(
            response => {
                this.getCustomerList();
            },
            error => {
                console.log(error);
                this.showMsg = true;
                setTimeout(() => {
                    this.showMsg = false;
                }, 3000);
            }
        );
    }

    openWindowCustomer(event): void {
        this.customerService.openWindowCustomer(event.id).subscribe(
            response => {
                //this.getCustomerList();
            },
            error => console.log(error));
    }
}


