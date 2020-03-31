import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./core/Home"
import AdminRoute from "./auth/helper/AdminRoute"
import MerchantRoute from "./auth/helper/MerchantRoute"
import AdminSignup from "./admin/AdminSignup"
import AdminSignin from "./admin/AdminSignin"
import MerchantSignup from "./merchant/MerchantSignup"
import MerchantSignin from "./merchant/MerchantSignin"

import AdminDashboard from "./admin/AdminDashBoard"
import AddCategory from "./admin/paths/AddCategory"
import ManageCategories from "./admin/paths/ManageCategories"
import AddMerchant from "./admin/paths/AddMerchant"
import ManageMerchants from "./admin/paths/ManageMerchants"

import MerchantDashboard from "./merchant/MerchantDashBoard"
import AddOffer from "./merchant/paths/AddOffer"
import ManageOffers from "./merchant/paths/ManageOffers"
import ManageMerchant from "./merchant/paths/ManageMerchant"


export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/adminsignup" component={AdminSignup}/>
                <Route path="/adminsignin" component={AdminSignin}/>
                <Route path="/merchantsignup" component={MerchantSignup}/>
                <Route path="/merchantsignin" component={MerchantSignin}/>
                
                <AdminRoute path="/admin/dashboard" component={AdminDashboard}/>
                <AdminRoute path="/admin/create/category" component={AddCategory}/>
                <AdminRoute path="/admin/categories" component={ManageCategories}/>
                <AdminRoute path="/admin/create/merchant" component={AddMerchant}/>
                <AdminRoute path="/admin/merchants" component={ManageMerchants}/>

                <MerchantRoute path="/merchant/dashboard" component={MerchantDashboard}/>
                <MerchantRoute path="/merchant/create/offer" component={AddOffer}/>
                <MerchantRoute path="/merchant/offers" component={ManageOffers}/>
                <MerchantRoute path="/merchant/merchant" component={ManageMerchant}/>
               
            </Switch>
        </Router>
    );
}

