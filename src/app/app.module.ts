import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import * as firebase from 'firebase';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ItemListComponent } from './item-list/item-list.component';
import { SingleItemComponent } from './item-list/single-item/single-item.component';
import { ItemFormComponent } from './item-list/item-form/item-form.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ItemsService } from './services/items.service';
import { AuthGuardService } from './services/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { BuyItemComponent } from './item-list/buy-item/buy-item.component';
import { from } from 'rxjs';
import {BasketService} from './services/basket.service';


const appRoutes: Routes = [
    { path: 'auth/signup', component: SignupComponent },
    { path: 'auth/signin', component: SigninComponent },
    { path: 'items', canActivate: [AuthGuardService], component: ItemListComponent },
    { path: 'basket', canActivate: [AuthGuardService], component: BuyItemComponent },
    { path: 'items/new', canActivate: [AuthGuardService], component: ItemFormComponent },
    { path: 'items/view/:id', canActivate: [AuthGuardService], component: SingleItemComponent },
    { path: '', redirectTo: 'items', pathMatch: 'full'},
    { path: '**', redirectTo: 'items'}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ItemListComponent,
    SingleItemComponent,
    ItemFormComponent,
    HeaderComponent,
    BuyItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  //  AngularFireModule.initializeApp(environment.firebase),
  //  AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService,
    ItemsService,
    AuthGuardService,
    BasketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
