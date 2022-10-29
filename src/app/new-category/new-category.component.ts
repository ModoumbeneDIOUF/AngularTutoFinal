import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from '../services/category-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  category : any = [];
  messageErreur="";
  catergorieErreur="";
  catError = false;
  save = false;
  errSave = false;
  saveMessage = "";

   constructor(private cat_service:CategoryServiceService) { }

  ngOnInit(): void {
  }

  showSuccessMessage( title:string, message:string, icon:any ,showCancelButton = true){
    return Swal.fire({

      title: title,
      text: message,
      icon: icon,
      showCloseButton: false,
      showCancelButton: false,
      position: 'top-end',
      showConfirmButton:false,
      timer: 4000

    }).then((result)=>{
        if(result.isConfirmed){

        }
    })
  }

  categoryLong(libelle:string){
    if(libelle.length < 6){
      this.catergorieErreur="minimun 6 caractéres"
      this.catError = true;
  } else{
    this.catergorieErreur="";
    this.catError = false;
  }

  }
  addCategory(){
    let categoryName = this.category.libelle;
    this.cat_service.addCategoryService(categoryName)
                    .subscribe((data) =>{
                      console.log(data);

                      // if(data.status === 200){
                      //     this.save = true;
                      //     this.saveMessage ="Category ajoutée avec success";

                      //     this.showSuccessMessage("Success","Category ajoutée avec success ","success")
                      //     this.category.libelle = " ";
                      //     console.log(this.saveMessage);
                      // }
                      // else{
                      //   this.save = false;
                      //   this.saveMessage ="Categorie existante";
                      //   // console.log(this.saveMessage);
                      // }
                    },err=>{

                      // if(err.status == 400){

                      //   this.messageErreur ='Categorie existante'

                      //   this.showSuccessMessage("Error","Categorie existante","error")
                      // }

                      // else{

                      //   this.showSuccessMessage("Error","Erreur au niveau du serveur","warning")

                      // }


                    });
  }

}
