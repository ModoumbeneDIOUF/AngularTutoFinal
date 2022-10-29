import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  passConf!:string
  passError = false;
  passConfError = false;
  emailError = false;
  messageErrorPassword ='';

  constructor(private register_s:LoginServiceService,private router:Router) { }

  ngOnInit(): void {
  }


  showSuccessMessage( title:string, message:string, icon:any ,showCancelButton = true){
    return Swal.fire({

      title: title,
      text: message,
      icon: icon,
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Se connecter',

      // position: 'top-end',
      // timer: 3000

      // showCancelButton: showCancelButton,

    }).then((result)=>{
        if(result.isConfirmed){
          if(icon == "warning"){

            this.router.navigate(["/login"])
          }

        }
    })
  }
  emailVerif(email:string){

    if((email.endsWith("@gmail.com"))||(email.endsWith("@yahoo.com"))||(email.endsWith("@hotmail.com")) ||(email.endsWith("@hotmail.fr"))||(email.endsWith("@yahoo.fr"))){
      this.emailError = false
    }
    else{
      this.emailError = true
    }

  }

  passwordLong(pass1:string){
    if(pass1.length < 6){
      this.passError = true
      this.messageErrorPassword="minimun 6 caractéres"
  }

  else if(pass1.length >= 6){
      setTimeout(
        ()=>{
             this.passError = false
              this.messageErrorPassword=''
        },500
      )
  }

    if(this.passConf != undefined){

      if(this.passConf != pass1){
        
        this.passConfError =  true
      }
      else{
        this.passConfError =  false
      }

  }
  }

  passwordVerif(pass1:string, pass2:string){
    if(pass1 != pass2){
      this.passConfError=true
    }else{
      this.passConfError=false
    }

  }



  registerUser(){
    let prenom = this.user.prenom;
    let nom = this.user.nom;
    let adresse = this.user.adresse;
    let telephone = this.user.telephone;
    let email = this.user.email;
    let password = this.user.password;

    this.register_s.RegisterUser(prenom,nom,adresse,telephone,email,password)
        .subscribe(data=>{

      //console.log(data.body['message'])
            if(data.body['message'] == "already"){

             this.showSuccessMessage('Erreur','Un compte avec '+email+' exite déjà','warning')

            }
            else if(data.body['message'] == "succefully"){

                    //  this.messageSuccess ='Inscription réussie vous pouvez vous connecter maintenant'


                     this.user.prenom = ""
                     this.user.nom = ""
                     this.user.adresse = ""
                     this.user.telephone = ""
                     this.user.email = ""
                     this.user.password = ""
                     this.passConf = ""

                      const Toast = Swal.mixin({

                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })

                    Toast.fire({
                      icon: "success",
                      title: "Inscription réussie"
                    })
                      this.router.navigate(["/login"])
                      console.log('Inscription reussi')
            }

            else{
              this.showSuccessMessage("Error","Erreur au niveau du serveur","error")
            }



        },err=>{

            this.showSuccessMessage("Error","Erreur au niveau du serveur","warning")



        });


  }

}
