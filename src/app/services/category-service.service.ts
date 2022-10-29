import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from '../model/ulr';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  url = new Url();
  baseUrl = this.url.url

  constructor(private http:HttpClient) { }

  addCategoryService(categoryName:any){

    return this.http.post<any>(this.baseUrl+'addCategory',{categoryName},{ observe: 'response' } );
  }

  allCategoryService(){
    return this.http.get(this.baseUrl+'allCategory');
  }

}
