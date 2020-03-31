import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import {Link} from "react-router-dom"
import { isAuthenticated } from '../../auth/helper/adminIndex';
import { getmerchants, deletemerchant } from '../../admin/helper/adminapicall';
export default function ManageMerchant() {

    const [merchants, setmerchants] =useState([]);

    const {admin, token} = isAuthenticated();
   
    const preload = () => {
        getmerchants().then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setmerchants(data);
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThisMerchant = (merchantId) => {
      deletemerchant(merchantId,token)
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
        <Base title="Welcome Merchant" description="Manage Merchant Account here">
        <Link className="btn btn-info" to={`/merchant/dashboard`}>
        <span className="">Merchant Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5">Merchants</h2>

            {merchants.map((merchant, index) => (
              
                <div key={index} className="row text-center mb-2 ml-3 ">
                
                  <div className="col-1">
                    <Link
                      className="btn btn-success"
                      to={`/admin/merchant/update/merchantId`}
                    >
                    <span className="">Update</span>
                    </Link>
                  </div>
                
                <div className="col-1">
                  <button onClick={() => {
                      deleteThisMerchant(merchant._id)
                  }} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              
                <div className="col-7 offset-1">
                    <h3 className="text-white text-left">{merchant.merchantName}</h3>
                </div>

              </div>
           
            ))
                }
          
        </div>
      </div>
    </Base>
    )
}
