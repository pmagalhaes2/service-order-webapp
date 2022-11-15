import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ServiceOrder } from "../models/ServiceOrder";

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<ServiceOrder[]> {
    const url = this.baseUrl + "/service-order";
    return this.http.get<ServiceOrder[]>(url);
  }

  findById(id: any): Observable<ServiceOrder> {
    const url = this.baseUrl + "/service-order/" + id;
    return this.http.get<ServiceOrder>(url)
  }

  create(serviceOrder: ServiceOrder): Observable<ServiceOrder> {
    const url = this.baseUrl + "/service-order";
    return this.http.post<ServiceOrder>(url, serviceOrder);
  }

  update(serviceOrder: ServiceOrder): Observable<ServiceOrder> {
    const url = this.baseUrl + "/service-order/" + serviceOrder.id;
    return this.http.put<ServiceOrder>(url, serviceOrder)
  }

  delete(id: any): Observable<void> {
    const url = this.baseUrl + "/service-order/" + id;
    return this.http.delete<void>(url)
  }

  returnMessage(msg: String): void {
    this.snack.open(`${msg}`, "x", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
      panelClass: ["customized-snackbar"],
    });
  }
}
