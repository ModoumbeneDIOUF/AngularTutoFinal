import { CategoryServiceService } from 'src/app/services/category-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Product } from '../model/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  categories: any = []

  product = new Product()

  productForm!:FormGroup;
  productNameError = false;
  descError = false;
  qtyError = false;
  priceError = false;
  priceMinError = false;
  fileError =false;
  is_success = false;
  messageErrorLenght ='';
  message: any;
  messageErreur="";
  save = false;
  saveMessage = "";


 constructor(private cat_service: CategoryServiceService, private product_s:ProduitService,private router:Router,private route:ActivatedRoute) { }


  ngOnInit():any {
    this.getAllCategories()
  }

  getAllCategories(){

    this.cat_service.allCategoryService().
    subscribe(response => {

        this.categories = response

        console.log(this.categories)
    })
  }

  showSuccessMessage( title:string, message:string, icon:any ,showCancelButton = true){
    return Swal.fire({

      title: title,
      text: message,
      icon: icon,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton:true,
      confirmButtonText:"Ajouter un nouveau produit",
      cancelButtonText:"Annuler"

    }).then((result)=>{

        if(result.isDismissed){

          this.router.navigate(["/conteneur/allProducts"])
        }
       else{
          window.location.reload();
       }

    })
  }

  onFileChange(event:any) {

    if(event.target.files[0] !== undefined) {

      this.product.fileName = event.target.files[0];

      this.fileError = false

    }
    else{
      this.fileError = true
    }


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
      if(data.status == 200){
        this.save = true;

         this.saveMessage ="Produit ajouté avec success";

         this.showSuccessMessage("Success","Produit ajouté avec success","success")


      }

    } ,err=>{

      if(err.status == 400){

        this.messageErreur ='Une erreur est intervenue'
        this.saveMessage ="Erreur";

        this.showSuccessMessage("Error","Une erreur est intervenue","error")
      }

      else{

        this.showSuccessMessage("Error","Erreur au niveau du serveur","warning")

      }


    }
    )
  }

  getProducts(){
    this.product_s.getAllProducts()

      .subscribe(data => {

        this.message = data

      })
  }

}
