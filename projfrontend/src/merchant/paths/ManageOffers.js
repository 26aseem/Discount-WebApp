import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import {Link} from "react-router-dom"
import { misAuthenticated } from '../../auth/helper/merchantIndex';
import { getoffers, deleteoffer } from '../helper/merchantapicall';

export default function ManageOffers() {

    const [offers, setoffers] =useState([]);

    const {merchant, token} = misAuthenticated();
   
    const preload = () => {
        getoffers(merchant._id, token).then(data => {
          
            if(data.error) {
                console.log(data.error);
            }else{
                setoffers(data);
                console.log(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThisOffer = (offerId) => {
      deleteoffer(offerId,merchant._id,token)
        .then(data=> {
            if(data.error){
                console.log(data.error)
            }
            else{
                preload();
            }
        })
    }



    return (
        <Base title="Welcome Merchant" description="Manage Offers here">
        <Link className="btn btn-info" to={`/merchant/dashboard`}>
        <span className="">Merchant Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5">Offers</h2>

            {offers.map((offer, index) => (
              
                <div key={index} className="row text-center mb-2 ml-3 ">
                
                  <div className="col-1">
                    <Link
                      className="btn btn-success"
                      to={`/merchant/offer/update/offerId`}
                    >
                    <span className="">
                      Update Offer
                      </span>
                    </Link>
                  </div>
                
                <div className="col-1">
                  <button onClick={() => {
                      deleteThisOffer(offer._id)
                  }} className="btn btn-danger">
                    Delete Offer
                  </button>
                </div>
              
                <div className="col-7 offset-1">
                    <h3 className="text-white text-left">{offer.offerName}</h3>
                </div>

              </div>
           
            ))
                }
          
        </div>
      </div>
    </Base>
    )
}
