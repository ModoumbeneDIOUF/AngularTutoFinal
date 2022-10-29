import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Url } from '../model/ulr';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

   id: any
   product : any;
   uri = new Url()
   imageUri = this.uri.uri

  constructor(private product_s:ProduitService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')

    this.getProductByID()
  }

  getProductByID(){

    this.product_s.getroductByID(this.id)

      .subscribe(data => {

        this.product = data
        this.product = this.product.product[0]
        console.log(this.product);


      })
  }

  deleteProd(id:any){

    this.product_s.deleteProduct(this.id)

    .subscribe(data => {


      console.log(data);


    })

  }

}
