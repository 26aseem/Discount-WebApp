import React from 'react'
import Base from "../core/Base"
import { misAuthenticated } from "../auth/helper/merchantIndex"
import {Link} from 'react-router-dom'

export default function AMerchantDashboard() {

    const {merchant: {merchantName, username, ownerName}} = misAuthenticated();

    const merchantLeftSide = () => {
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                    Merchant Navigation
                </h4>

                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/merchant/create/offer" className="nav-link text-success">
                            Create Offer
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/merchant/offers" className="nav-link text-success">
                            Manage Offers
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/merchant/merchant" className="nav-link text-success">
                            Manage Merchant Account
                        </Link>
                    </li>
                    
                </ul>
            </div>
        )
    };

    const merchantRightSide = () => {
      return(
        <div className="card mb-4">
            <h4 className="card-header">Merchant Info</h4>
        <ul className="list-group">
            <li className="list-group-item">
                <span className="badge badge-success mr-2">
                    Username:
                </span> {username}
            </li>
            <li className="list-group-item">
                <span className="badge badge-success mr-2">
                    Merchant Name:
                </span> {merchantName}
            </li>
            <li className="list-group-item">
                <span className="badge badge-success mr-2">
                    Owner Name:
                </span> {ownerName}
            </li>
            <li className="list-group-item">
                <span className="badge badge-danger mr-2">
                    Merchant Privileges Granted Successfully
                </span> 
            </li>
        </ul>
        </div>
      )  
    };

    return (
        <Base 
        title="Welcome to Merchant Dashboard" 
        description="Manage all the OFFERS"
        className="container bg-success p-4"
        >
            <div className="row">
                <div className="col-3">
                        {merchantLeftSide()}
                </div>

                <div className="col-9">
                        {merchantRightSide()}                    
                </div>
            </div>

        </Base>
    )
}
