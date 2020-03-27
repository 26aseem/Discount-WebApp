import React from 'react'
import {Link, withRouter} from "react-router-dom"

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#2ecc72"}
    }
    else{
        return {color: "#FFFFFF"}
    }
};

const Navbar = ({history}) => (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history,"/")}
                     className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/admin/dashboard")}
                     className="nav-link" to="/admin/dashboard">
                        Admin Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/merchant/dashboard")}
                    className="nav-link" to="/merchant/dashboard">
                        Merchant Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/adminsignup")}
                    className="nav-link" to="/adminsignup">
                        Admin Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/adminsignin")}
                    className="nav-link" to="/adminsignin">
                        Admin Signin
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/merchantsignup")}
                    className="nav-link" to="/merchantsignup">
                        Merchant Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/merchantsignin")}
                    className="nav-link" to="/merchantsignin">
                        Merchant Signin
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/adminsignout")}
                    className="nav-link" to="/adminsignout">
                        Admin Signout
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/merchantsignout")}
                    className="nav-link" to="/merchantsignout">
                        Merchant Signout
                    </Link>
                </li>
            </ul>
        </div>
    )


export default withRouter(Navbar);
