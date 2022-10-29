import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { ConteneurComponent } from './conteneur/conteneur.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './component/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

  {path:'conteneur',component:ConteneurComponent,

      children:[
        {path:'home',component:HomeComponent},
        {path:'addCategory',component:NewCategoryComponent},
        {path:'addProduct',component:NewProductComponent},
        {path:'allProducts',component:ProductsComponent},
        {path:'product/:id',component:ProductDetailsComponent},
        {path:'productUpdate/:id',component:ProductUpdateComponent},

      ],canActivate:[AuthGuard]
},
  {path:'**',component:PagenotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
