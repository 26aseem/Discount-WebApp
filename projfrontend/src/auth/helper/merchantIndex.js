import {API} from "../../backend"
// API is basically path

// Backend for Signup
export const signup = merchant => {
    return fetch(`${API}/merchantsignup`, {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(merchant)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


// Backend for Signin
export const signin = merchant => {
    return fetch(`${API}/merchantsignin`, {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(merchant)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const authenticate = (data, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

// Backend for Signout
export const signout = next => {
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next();

        return fetch(`${API}/merchantsignout`, {
          method: "GET"  
        })
        .then(response => console.log("Signout Success"))
        .catch(err => console.log(err))
    }
    
};

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};