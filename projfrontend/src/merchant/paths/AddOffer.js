import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import { misAuthenticated } from "../../auth/helper/merchantIndex"
import {Link} from "react-router-dom";
import {createoffer, getmerchant} from "../helper/merchantapicall"

export default function AddOffer() {

        const {merchant, token} = misAuthenticated();
    
        const [values, setValues] = useState({
            offerName:"",
            offerDesc:"",
            offerStartDate: "",
            offerEndDate: "",
            photo: "",
            merch: "",
            merchant: "",
            loading: false,
            error: "",
            CreatedOffer: "",
            getaRedirect: false,
            formData: ""
        });
    
        const { offerName, offerDesc, offerStartDate, offerEndDate, photo, 
          merch, loading, merchants, error, CreatedOffer, getaRedirect, formData } = values;


        
    
        const preload = () => {
            getmerchant(merchant._id, token).then(data=>{
              
                if(data.error) {
                    setValues({...values, error: data})
                } else{
                    setValues({...values, merchants: data, formData: new FormData()});
               }
            })
        }
    
        useEffect(() => {
            preload();
        }, [] )
         


      const successMessage = () => (
            <div className="alert alert-success mt-3"
                style={{display: CreatedOffer ? "" : "none"}}
            >
                <h4>{CreatedOffer} created successfully </h4>
            </div>
        )
    
        const warningMessage = () => (
            <div className="alert alert-danger mt-3"
                style={{display: error ? "" : "none"}}
            >
                <h4> {error} </h4>
            </div>
        )
    
        const onSubmit = (event) => {
          
            event.preventDefault();
            setValues({...values, error: "", loading: true})
            
            createoffer(merchant._id, token, formData)
            .then(data => {
                if(data.error){
                    setValues({...values, error:data.error})
                }else{
                    setValues({
                        ...values,
                        offerName: "",
                        offerDesc: "",
                        offerStartDate: "",
                        offerEndDate: "",
                        photo: "",
                        merch: "",
                        loading: false,
                        error: "",
                        CreatedOffer: data.offerName
                    })
                }
            }
    
            )
            .catch(
              console.log("Error Found")
            )
        }
    
        const handleChange = name => event => {
          if (name === "merch"){
            const value = merchant._id
            formData.set(name, value)
            setValues({...values, [name]:value})
          } 
          else{
            const value = name ==="photo" ? event.target.files[0] : event.target.value
            formData.set(name, value)
            setValues({...values, [name]:value})
          }
          };

          

        const createOfferForm = () => (
            <form className="mt-4">
              <div className="form-group">
              <label className="text-light"> Offer Name <span className="text-warning">*</span></label>
                <input
                  onChange={handleChange("offerName")}
                  name="offerName"
                  className="form-control"
                  placeholder="Offer Name"
                  value={offerName}
                />
              </div>
              <div className="form-group">
              <label className="text-light"> Description <span className="text-warning">*</span></label>
                <textarea
                  onChange={handleChange("offerDesc")}
                  name="offerDesc"
                  className="form-control"
                  placeholder="Description"
                  value={offerDesc}
                />
              </div>
              <div className="form-group">
              <label className="text-light"> Offer Start Date <span className="text-warning">*</span></label>
                <input
                  onChange={handleChange("offerStartDate")}
                  type="date"
                  className="form-control"
                  placeholder="Offer Start Date"
                  value={offerStartDate}
                  name="offerStartDate"
                />
              </div>
              
              <div className="form-group">
              <label className="text-light"> Offer Last Date <span className="text-warning">*</span></label>
                <input
                  onChange={handleChange("offerEndDate")}
                  type="date"
                  className="form-control"
                  placeholder="Offer End Date"
                  value={offerEndDate}
                  name="offerEndDate"
                />
              </div>

              <div className="form-group">
              <label className="text-light"> Merchant <span className="text-warning">*</span></label>
                <input
                  onChange={handleChange("merch")}
                  type="text"
                  className="form-control"
                  placeholder="Merchant Name"
                  value={merch}
                  name="merch"
                />
              </div>

              
              <span className="text-white"> Offer Photo </span>
              <div className="form-group">
                <label className="btn btn-block btn-success">
                  <input
                    onChange={handleChange("photo")}
                    type="file"
                    name="photo"
                    accept="image"
                    placeholder="Choose an Image for the Offer"
                  />
                </label>
              </div>
              
              <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-4">
                Create Offer
              </button>
            </form>
          );
        
        
        
        
        
        return(
            <Base
            title="Add an Offer here!"
            description="Welcome to Offer Creation Section"
            className="container bg-success p-4"
            >
            
            <Link to="/merchant/dashboard" className="btn brn-md btn-dark mb-3">
                Merchant Home
            </Link>
    
            <div className="row bg-dark test-white rounded center">
                <div className="col-md-8 offset-md-20 ">
                    {createOfferForm()}
                    {successMessage()}
                    {warningMessage()}
                </div>
            </div>
    
            </Base>
        )
    }