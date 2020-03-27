import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./core/Home"
import AdminSignup from "./admin/AdminSignup"
import AdminSignin from "./admin/AdminSignin"
import MerchantSignup from "./merchant/MerchantSignup"
import MerchantSignin from "./merchant/MerchantSignin"

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/adminsignup" component={AdminSignup}/>
                <Route path="/adminsignin" component={AdminSignin}/>
                <Route path="/merchantsignup" component={MerchantSignup}/>
                <Route path="/merchantsignin" component={MerchantSignin}/>
                <Route path="/" component="" />
                <Route path="/" component="" />
            </Switch>
        </Router>
    );
}

