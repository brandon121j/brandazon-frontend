import React, { useReducer, useState } from 'react';

export const AuthContext = React.createContext({});

let userID = sessionStorage.getItem('userID')

const initialState = {
	user: userID ? true : null
};

function reducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            console.log(action.cart)
            return {
                user: {
                    userID: action.userID,
                    email: action.email,
                    firstName: action.firstName,
                    lastName: action.lastName,
                    wishlist: action.wishlist,
                    cart: action.cart,
                    cartItems: action.cart.length
                }
            };
        case "UPDATE": 
            return {
                user: {
                    userID: action.userID,
                    email: action.email,
                    firstName: action.firstName,
                    lastName: action.lastName,
                    wishlist: action.wishlist,
                    cart: action.cart,
                    cartItems: action.cart.length
                }
            }
        case "LOGOUT":
            sessionStorage.removeItem('userID');
            return {
                user: null,
            };
        default:
            return state;
    }
}

function AuthContextComponent({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextComponent;
