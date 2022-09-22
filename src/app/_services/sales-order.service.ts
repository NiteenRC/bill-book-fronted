import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientHelper } from '../_model/http-client-helper';

@Injectable({
    providedIn: 'root'
})
export class SalesOrderService {

    private baseUrl = HttpClientHelper.baseURL + '/salesOrder';

    constructor(private http: HttpClient) {
    }

    createSalesOrder(invoice: any): Observable<any> {
        return this.http.post(`${this.baseUrl}`, invoice);
    }

    getSalesOrderList(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }

    countSalesOrders(): Observable<any> {
        return this.http.get(`${this.baseUrl}/transactions/count`);
    }

    getSalesOrderBalaceByCustomer(customerID: any): any {
        return this.http.get(`${this.baseUrl}/customer/balance/${customerID}`);
    }

    getAllCustomerSalesOrderBalance(): any {
        return this.http.get(`${this.baseUrl}/customer/`);
    }

    getAllCustomerSalesOrderBalanceSheet(): any {
        return this.http.get(`${this.baseUrl}/customer/balance`);
    }

    updateSalesOrder(value: any): Observable<Object> {
        return this.http.put(`${this.baseUrl}`, value);
    }

    updateSalesOrderBalance(value: any): Observable<Object> {
        return this.http.put(`${this.baseUrl}/payment/balance`, value);
    }

    getBarChartReport(): any {
        return this.http.get(`${this.baseUrl}/barChart`);
    }

    getSalesOrderByProductWise(): any {
        return this.http.get(`${this.baseUrl}/product`);
    }

    deleteSalesOrder(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
    }

    deleteOrderDetails(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/details/${id}`, {responseType: 'text'});
    }

    getSalesOrder(salesOrderID: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${salesOrderID}`);
    }

    getSalesOrderDetailsList(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/details/${id}`);
    }

    getSalesOrderByCustomer(supplierID: number): any {
        return this.http.get(`${this.baseUrl}/customer/${supplierID}`);
    }
}