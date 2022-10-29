import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginServiceService } from 'src/app/services/login-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();

  passError = false;
  emailError = false;

    constructor(private login_s:LoginServiceService,private router:Router) { }

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
      cancelButtonColor: '#d33',
      confirmButtonText: 'Réessayer',

    }).then((result)=>{
        if(result.isConfirmed){

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
      this.passError =  true

  }
  else if(pass1.length >= 5){
      setTimeout(
        ()=>{
              this.passError =  false

        },100
      )
  }



  }

  // loginMy()
  //   {
  //     this.router.navigate(["register"])

  // }

  loginMy()
    {
       let email = this.user.email;
       let password = this.user.password;

    this.login_s.loginUser(email,password)
    .subscribe(data => {

      console.log(data.body)

        if(data.body['message'] == "succefully"){

             localStorage.setItem('token','logged')
             this.router.navigate(["/conteneur/home"])

            console.log("la connection s'est bien passé")
         }
         else{


          this.showSuccessMessage("Error","Login et/ou mot de passe incorrect","error")
         }

    },err=>{
      console.log(err);


          this.showSuccessMessage("Error","Erreur au niveau du serveur","warning")


    });
  }
}
