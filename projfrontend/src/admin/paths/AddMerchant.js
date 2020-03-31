import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import { Link } from "react-router-dom"
import { getcategories, createmerchant } from "../helper/adminapicall"
import {isAuthenticated} from "../../auth/helper/adminIndex" 

export default function AddMerchant() {

    //const {admin,token} = isAuthenticated();

    const [values, setValues] = useState({
        merchantName: "",
        ownerName: "",
        city: "",
        state: "",
        country: "",
        streetAddress: "",
        pincode: "",
        contact: "",
        altcontact: "",
        category: "",
        categories: [],
        description: "",
        merchantPhoto: "",
        email: "",
        username: "",
        password: "",
        loading: false,
        error: "",
        CreatedMerchant: "",
        getaRedirect: false,
        formData: ""
    });

    const {  merchantName, ownerName, city, state, country, streetAddress, pincode, contact,
      altcontact,description,merchantPhoto, email, username, password, category, categories, loading, 
      error, CreatedMerchant, getaRedirect, formData } = values;

    const preload = () => {
        getcategories().then(data=>{
            if(data.error) {
                setValues({...values, error: data})
            } else{
                setValues({...values, categories: data, formData: new FormData()});
              
            }
        })
    }

    useEffect(() => {
        preload();
    }, [] )

    const successMessage = () => (
        <div className="alert alert-success mt-3"
            style={{display: CreatedMerchant ? "" : "none"}}
        >
            <h4>{CreatedMerchant} created successfully </h4>
        </div>
    )

    const warningMessage = () => (
        <div className="alert alert-danger mt-3"
            style={{display: error ? "" : "none"}}
        >
            <h4>{error} </h4>
        </div>
    )

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true})
        createmerchant(formData)
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error,CreatedMerchant: ""})
            }else{
                setValues({
                    ...values,
                    merchantName: "",
                    ownerName: "",
                    city: "",
                    state: "",
                    country: "",
                    streetAddress: "",
                    pincode: "",
                    contact: "",
                    altcontact: "",
                    description: "",
                    merchantPhoto: "",
                    email: "",
                    username: "",
                    password: "",
                    loading: false,
                    error: "",
                    CreatedMerchant: data.merchantName
                })
            }
        }

        )
        .catch(console.log("data.error"))
    }

    const handleChange = name => event => {
        const value = name ==="merchantPhoto" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]:value})
    };
    
    const createProductForm = () => (
        <form className="mt-4">
          <div className="form-group">
            <input
              onChange={handleChange("merchantName")}
              name="merchantName"
              className="form-control"
              placeholder="Merchant Name"
              value={merchantName}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("ownerName")}
              name="ownerName"
              className="form-control"
              placeholder="Owner Name"
              value={ownerName}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("city")}
              name="city"
              className="form-control"
              placeholder="City"
              value={city}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("state")}
              name="state"
              className="form-control"
              placeholder="State"
              value={state}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("country")}
              name="country"
              className="form-control"
              placeholder="Country"
              value={country}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("streetAddress")}
              name="streetAddress"
              className="form-control"
              placeholder="Street Address"
              value={streetAddress}
            />
          </div>
          
          <div className="form-group">
            <input
              onChange={handleChange("pincode")}
              name="pincode"
              className="form-control"
              placeholder="Pincode"
              value={pincode}
              type="number"
            />
          </div>
          
          <div className="form-group">
            <input
              onChange={handleChange("contact")}
              name="contact"
              className="form-control"
              placeholder="Contact"
              value={contact}
              type="number"
            />
          </div>

          <div className="form-group">
            <input
              onChange={handleChange("altcontact")}
              name="altcontact"
              className="form-control"
              placeholder="Alternate Contact"
              value={altcontact}
              type="number"
            />
          </div>

          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              className="form-control"
              placeholder="Description"
              value={description}
              name="description"
            />
          </div>

          <div className="form-group">
            <input
              onChange={handleChange("username")}
              name="username"
              className="form-control"
              placeholder="Username"
              value={username}
            />
          </div>

          <div className="form-group">
            <input
              onChange={handleChange("email")}
              name="email"
              className="form-control"
              placeholder="Email"
              value={email}
            />
          </div>

          <div className="form-group">
            <input
              onChange={handleChange("password")}
              name="password"
              className="form-control"
              placeholder="Password"
              value={password}
              type="password"
            />
          </div>

          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select the Category</option>
              {categories && categories.map((cate, index) =>{
                  return(
                      <option key={index} value={cate._id}>
                          {cate.name}
                      </option>
                  )
              })}
            </select>
          </div>
          
          <span className="text-white">Post Merchant Photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("merchantPhoto")}
                type="file"
                name="merchantPhoto"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-4">
            Create Product
          </button>
        </form>
      );
    
    
    
    
    
    return(
        <Base
        title="Add a Product here!"
        description="Welcome to Product Creation Section"
        className="container bg-success p-4"
        >
        
        <Link to="/admin/dashboard" className="btn brn-md btn-dark mb-3">
            Admin Home
        </Link>

        <div className="row bg-dark test-white rounded center">
            <div className="col-md-8 offset-md-20 ">
                {createProductForm()}
                {successMessage()}
                {warningMessage()}
            </div>
        </div>

        </Base>
    )
}