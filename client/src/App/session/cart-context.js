import React from "react";
import { withFirebase } from "../../firebase";

const CartStateContext = React.createContext()
const CartDispatchContext = React.createContext()

const initialState = {
    cart: [],
    itemMap: {},
    totalPrice: 0,
}
export const cartReducer = (state=initialState, action) =>{
    let updatedCart = [...state.cart]
    let updatedTotal = state.totalPrice
    // let updatedGst = state.gst
    const updatedMap = { ...state.itemMap }
    switch (action.type) {
        case "clear":
            return initialState;
        case "add":
            updatedMap[item.id] = updatedCart.length;
            updatedCart.push({
                ...item,
                quantity: 1
            })
            return {
               ...state,
               updatedCart,
            };
        case "set_total":
            updatedCart.map(item => {
                updatedTotal += item.price;
            })
            return {
                updatedTotal
            };
        case "fetch":
            return {
                cart: updatedCart,
            };
        case 'remove': 
            updatedTotal -= item.price;
            delete updatedMap[item.id]
            return updatedCart.filter(item => item.id !== action.id);
        case "checkout":
            return initialState;    
        default:
            return state;
    }
}

function cartProvider({children}) {
    const {data} = useCart();
    const [state, dispatch] = React.useReducer(cartReducer, data )
    return (
      <CartStateContext.Provider value={state}>
        <CartDispatchContext.Provider value={dispatch}>
          {children}
        </CartDispatchContext.Provider>
      </CartStateContext.Provider>
    )
  }

export {cartProvider};


const CRUD = ({ firebase }) => {

    function clearCart(dispatch, id) {
        return firebase.doRemoveUserCart(id).then(data => {
          dispatch({type: 'checkout'})
          return data ;
        });
      }

    function addCartItem(dispatch, cartItemData) {
    return firebase.doAddItemToCart(cartItemData).then(data => {
        dispatch({type: 'add', item: data})
        return data
    })
    }

    function removeCartItem(dispatch, id, courseName) {
        return firebase.doRemoveCartItem(id, courseName).then(data => {
          dispatch({type: 'remove', item: data})
          return data
        })
      }
      return {
          removeCartItem,
          addCartItem,
          clearCart
      }
};
export default withFirebase(CRUD);

function useListItemDispatch() {
    const context = React.useContext(ListItemDispatchContext)
    if (context === undefined) {
        throw new Error(
        `useListItemDispatch must be used within a ListItemProvider`,
        )
    }
    return context
    }

function useListItemState() {
    const context = React.useContext(ListItemStateContext)
    if (context === undefined) {
        throw new Error(`useListItemState must be used within a ListItemProvider`)
    }
    return context
}
export {useListItemDispatch, useListItemState}