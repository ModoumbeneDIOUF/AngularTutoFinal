import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './component/register/register.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { ConteneurComponent } from './conteneur/conteneur.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './static/header/header.component';
import { FooterComponent } from './static/footer/footer.component';
import { NavLeftComponent } from './static/nav-left/nav-left.component';
import { SliderComponent } from './static/slider/slider.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent,
    ConteneurComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavLeftComponent,
    SliderComponent,
    NewCategoryComponent,
    NewProductComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
