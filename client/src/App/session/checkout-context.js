import React from "react";

export const stateCTX = React.createContext();
export const dispatchCTX = React.createContext();

const initialState = {
    cardDetails: {},
    billingAddress: "",
    totalPrice: 0,
}
export const reducer = (state=initialState, action) =>{
    switch (action.type) {
        case "selected":
            state.cardDetails = {...action.payload}
            return {
                ...state 
            };
        case "add":
            state.cardDetails = {...action.payload}
            return {
                ...state 
            };
        case "address":
            state.billingAddress = action.payload;
            return {
                ...state 
            };
        case "totals":
            state.totalPrice = action.payload;
            return {
                ...state 
            };
        case "checkout":
            return initialState;    
        default:
            return state;
    }
}

export default function Store (props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <stateCTX.Provider value={state}>
            <dispatchCTX.Provider value={dispatch} >
                    {props.children}
            </dispatchCTX.Provider>
        </stateCTX.Provider>
    )
}