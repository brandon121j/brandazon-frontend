import React, { useReducer, useState } from 'react';

export const AuthContext = React.createContext({});

const initialState = {
	user: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                user: {
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
                    email: action.email,
                    firstName: action.firstName,
                    lastName: action.lastName,
                    wishlist: action.wishlist,
                    cart: action.cart,
                    cartItems: action.cart.length
                }
            }
        case "LOGOUT":
            return {
                user: null
            };
        default:
            return state;
    }
}

function AuthContextComponent({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state);
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextComponent;
