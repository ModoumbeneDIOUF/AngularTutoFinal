import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  id: any

  productFind : any = [];

  product = new Product()

  productForm!:FormGroup;
  productNameError = false;
  descError = false;
  qtyError = false;
  priceError = false;
  priceMinError = false;
  is_success = false;
  messageErrorLenght ='';
  message: any;

  imageSrc: string = '';
  previews: string[] = [];
  form!: FormGroup;
  progress: number = 0;
  filedata:any;
  file!: File

  fileEvent(e:any){
    this.filedata = e.target.files[0];
 }

 constructor(private product_s:ProduitService,private router:Router,private route:ActivatedRoute) { }


  ngOnInit():any {
    this.id = this.route.snapshot.paramMap.get('id')

    this.getProductByID()
  }


  onFileChange(event:any) {

    this.product.fileName = event.target.files[0];

    console.log(this.form.value.avatar);
  }


  productNameLong(name:string){
    if(name.length < 6){
      this.productNameError = true

  }
  else if(name.length >= 5){
      setTimeout(
        ()=>{
              this.productNameError = false

        },100
      )
  }
  }

  descLong(name:string){
    if(name.length < 10){

      this.descError = true

  }

  else if(name.length >= 9){
      setTimeout(
        ()=>{
              this.descError = false

        },100
      )
  }
  }

  priceVerify(price:number){
    if(price <= 0 ){

      this.priceError = true

  }
  else if(price < 99){

    this.priceMinError = true
  }

  else if(price >= 100){
      setTimeout(
        ()=>{
              this.priceError = false
              this.priceMinError = false

        },100
      )
  }
  }

  qtyVerify(qty:number){
    if(qty <= 0 ){

      this.qtyError = true

  }

  else if(qty >= 1){
      setTimeout(
        ()=>{
              this.qtyError = false

        },100
      )
  }
  }


  submitProduct() {
    let idCat = this.product.idCat
    let productName = this.product.productName
    let productDesc = this.product.productDesc
    let productPrice = this.product.productPrice
    let productQty = this.product.productQty

    this.product_s.addProduct(
       idCat,
       productName,
       productDesc,
       productPrice,
       productQty,
       this.product.fileName

    ).subscribe(data => {

      console.log(data["body"])

    })
  }

  getProductByID(){

    this.product_s.getroductByID(this.id)

      .subscribe(data => {
        console.log(data)
        this.productFind = data
        this.product.productName =  this.productFind.product[0].productName
        this.product.productDesc =  this.productFind.product[0].productDesc
        this.product.productPrice =  this.productFind.product[0].productPrice
        this.product.productQty =  this.productFind.product[0].productQty


      })
  }

  updateProduct(){


    let productName = this.product.productName
    let productDesc = this.product.productDesc
    let productPrice = this.product.productPrice
    let productQty = this.product.productQty

     this.product_s.updateProduct(
       this.id,productName,productDesc,productPrice,productQty, this.product.fileName
      )

      .subscribe(data => {
        console.log(data)
        this.productFind = data
        this.router.navigate(["/conteneur/allProducts"])

      })
  }


}
