import { Component, OnInit } from '@angular/core';
import { Url } from '../model/ulr';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  uri = new Url()
  imageUri = this.uri.uri
  allProducts : any = [];
  constructor(private product_s:ProduitService) { }

  ngOnInit(): void {
      this.getProducts()
  }


  getProducts(){
    this.product_s.getAllProducts()

      .subscribe(data => {

        this.allProducts = data
        console.log(this.allProducts);

      })
  }
}
