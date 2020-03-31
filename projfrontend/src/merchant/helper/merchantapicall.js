import { API } from "../../backend"

// Offers
export const createoffer = (merchantid, token, offer) => {
    return fetch (`${API}/offer/create/${merchantid}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          //"Content-Type": "application/json",
         Authorization: `Bearer ${token}`
       },
    body: offer
    
    })
    .then(response => {
        console.log(response)
        return response.json();
    })
    .catch(err => console.log("bb"));
};
//export default createoffer;


// get all offers
export const getoffers = (merchantId,token) => {
    return fetch(`${API}/offers/${merchantId}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response)
        return response.json();
        
    })
    .catch(err => console.log(err));
};



// delete a offer
export const deleteoffer = (offerId, merchantId, token) => {
    return fetch(`${API}/offer/${offerId}/${merchantId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         }
      
      })
      .then(response => {
          console.log(response)
        return response.json();
    })
    .catch(err => console.log(err));
}
  


// get a offer
export const getoffer = (offerId, merchantId) => {
    return fetch(`${API}/offer/${offerId}/${merchantId}`,{
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


// update an offer

export const updateoffer = (offerId, token, merchantId, offer) => {
    return fetch(`${API}/offer/${offerId}/${merchantId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         },
      body: offer
      
      })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
  };
  




// Merchant Call

// delete a merchant
export const deletemerchant = (merchantId,token) => {
    return fetch(`${API}/merchant/${merchantId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         }
      
      })
      .then(response => {
          console.log(response)
        return response.json();
    })
    .catch(err => console.log(err));
}
  


// get a merchant
export const getmerchant = (merchantId, token) => {
    return fetch(`${API}/merchant/${merchantId}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        
        return response.json();
    })
    .catch(err => console.log(err));
};


// update a merchant

export const updatemerchant = (merchantId, token, merchant) => {
    return fetch(`${API}/merchant${merchant}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         },
      body: merchant
      
      })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
  };
  