import React, {useState} from"react"
import Base from "../core/Base"
import {Link} from "react-router-dom"
import { msignup } from "../auth/helper/merchantIndex";

const MerchantSignup = () => {

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
        description: "",
        merchantPhoto: "",
        email: "",
        username: "",
        password: "",
        error: "",
        success: false
    });

    const {merchantName, ownerName, city, state, country, streetAddress, pincode, contact, altcontact, category, description, merchantPhoto, 
        email, username, password, error, success} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        msignup({merchantName, ownerName, city, state, country, streetAddress, pincode, contact, altcontact, category, description, merchantPhoto, 
            email, username, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            } else{
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
                    category: "",
                    description: "",
                    merchantPhoto: "",
                    email: "",
                    username: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        })
        .catch(console.log("Error in Merchant Signup"))
    };

    const onReset = event => {
        event.preventDefault()
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
                    category: "",
                    description: "",
                    merchantPhoto: "",
                    email: "",
                    username: "",
                    password: "",
                    error: "",
                    success: false
                });
            };



    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light"> Merchant Name </label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("merchantName")}
                            value={merchantName}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Owner Name </label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("ownerName")}
                            value={ownerName}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> City </label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("city")}
                            value={city}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> State </label>
                            <input type="text" className="form-control"
                            onChange={handleChange("state")}
                            value={state}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Country </label>
                            <input type="text" className="form-control"
                            onChange={handleChange("country")}
                            value={country}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Pincode </label>
                            <input type="number" className="form-control"
                            onChange={handleChange("pincode")}
                            value={pincode}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Contact </label>
                            <input type="number" className="form-control"
                            onChange={handleChange("contact")}
                            value={contact}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Alternate Contact </label>
                            <input type="number" className="form-control"
                            onChange={handleChange("alcontact")}
                            value={altcontact}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Category </label>
                            <input type="text" className="form-control"
                            onChange={handleChange("category")}
                            value={category}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Description </label>
                            <input type="text" className="form-control"
                            onChange={handleChange("description")}
                            value={description}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Merchant Photo </label>
                            <input type="file" className="form-control"
                            onChange={handleChange("merchantPhoto")}
                            value={merchantPhoto}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Username </label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("username")}
                            value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Email </label>
                            <input type="email" className="form-control"
                            onChange={handleChange("email")}
                            value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Password </label>
                            <input type="password" className="form-control"
                            onChange={handleChange("password")}
                            value={password}
                            />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                        <button className="btn btn-info btn-block" onClick={onReset}>Reset </button>
                    </form>
                </div>
            </div>
        );
    };

    const successMessage = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-success"
        style={{display: success ? "" : "none"}}
        >
            New Merchant Added successfully.
            <Link to="/merchantsignin">Login Here</Link>
        </div>
        </div>
        </div>
    )

    const errorMessage = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger"
        style={{display: error ? "" : "none"}}
        >
            {error}
        </div>
        </div>
        </div>
    )



    return (
        <Base title="Merchant Sign Up" description="A page for Merchant to sign up">
            {signUpForm()}
            {successMessage()}
            {errorMessage()}
            
            <p className="text-white text-center">{JSON.stringify(values)}</p>
            
        </Base>
    );
}

export default MerchantSignup;