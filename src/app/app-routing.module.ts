import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { mainTitle } from './data';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', title: 'Home: ' + mainTitle, component: HomePageComponent},
  { path: 'menu', title: 'Our Menu: ' + mainTitle, component: MenuPageComponent},
  { path: 'product/:productId', component: ProductDetailsComponent},
  { path: 'cart', title: 'My Cart: ' + mainTitle, component: CartComponent},
  { path: 'checkout', title: 'Checkout: ' + mainTitle, component: CheckoutComponent},
  { path: 'about', title: 'About Us: ' + mainTitle, component: AboutPageComponent},
  { path: 'contact', title: 'Contact Us: ' + mainTitle, component: ContactPageComponent},
  { path: '404', title: 'Page Not Found: ' + mainTitle , component: PageNotFoundComponent},
  { path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
