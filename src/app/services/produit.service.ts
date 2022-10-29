import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Url } from '../model/ulr';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {


  url = new Url();
  baseUrl = this.url.url
   //http://127.0.0.1:8000/api/

  constructor(private http:HttpClient) { }




  addProduct(idCat:any,productName:any, productDesc:any, productPrice: any,productQty:any, image:any):Observable<any>{

    var formData: any = new FormData();
    formData.append("idCat", idCat);
    formData.append("productName", productName);
    formData.append("productDesc", productDesc);
    formData.append("productPrice", productPrice);
    formData.append("fileName", image);
    formData.append("productQty", productQty);

    return this.http.post<string>(this.baseUrl+'addProduct', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )

  } errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getAllProducts(){
    return this.http.get(this.baseUrl+'products');
  }

  getroductByID(id:string){

     return this.http.get(this.baseUrl+'getOneProduct/'+id);
  }

  deleteProduct(id:any){

    return this.http.delete(this.baseUrl+'deleteProduct/'+id);
 }

  updateProduct(id:string,productName:string, productDesc:string, productPrice: string,productQty:string, image:string):Observable<any>{

    var formData: any = new FormData();
    formData.append("productName", productName);
    formData.append("productDesc", productDesc);
    formData.append("productPrice", productPrice);
    formData.append("productImage", image);
    formData.append("productQty", productQty);

    return this.http.patch<string>(this.baseUrl+'product/'+id, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )

  }



}
