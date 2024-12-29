import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuctioneerDashboardComponent } from './components/auctioneer-dashboard/auctioneer-dashboard.component';
import { BidderDashboardComponent } from './components/bidder-dashboard/bidder-dashboard.component';

export const routes: Routes = [
    {
        path:"create-account",
        component:RegistrationComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"about-us",
        component:AboutComponent
    },
    {
        path:"contact",
        component:ContactComponent
    },
    {
        path:"forgot-password",
        component:ForgetPasswordComponent
    },
    {
        path:"auctioneer-dashboard",
        component:AuctioneerDashboardComponent
    },
    {
        path:"bidder-dashboard",
        component:BidderDashboardComponent
    }
];
