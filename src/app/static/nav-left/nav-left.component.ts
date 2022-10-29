import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.css']
})
export class NavLeftComponent implements OnInit {

   categorysAll : any = [];

  constructor(private cat_Service:CategoryServiceService) { }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(){

    this.cat_Service.allCategoryService()

                    .subscribe(data =>{
                      // console.log(data)

                      this.categorysAll = data;

                    }),(err: any)=>{
                      console.log(err);

                    }
  }
}
