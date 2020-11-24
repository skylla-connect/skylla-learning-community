import React from "react";

const OrderStateContext = React.createContext()
const OrderDispatchContext = React.createContext()


const orderReducer = (state = [], action) => {
    switch (action.type) {
        case 'add': {
            return [...state, action.payload]
          }
        case "fetch":
            return [...action.payload]

        default:
            return state;
    }
}

export {orderReducer};

const OrderProvider = ({children}) => { 
    const [state, dispatch] = React.useReducer(orderReducer, [])
    return (
      <OrderStateContext.Provider value={state}>
        <OrderDispatchContext.Provider value={dispatch}>
          {children}
        </OrderDispatchContext.Provider>
      </OrderStateContext.Provider>
    )
  }

export default OrderProvider;

function useOrderItemDispatch() {
    const context = React.useContext(OrderDispatchContext)
    if (context === undefined) {
        throw new Error(
        `useListItemDispatch must be used within a ListItemProvider`,
        )
    }
    return context
    }

function useOrderItemState() {
    const context = React.useContext(OrderStateContext)
    if (context === undefined) {
        throw new Error(`useListItemState must be used within a ListItemProvider`)
    }
    return context
}
export {useOrderItemDispatch, useOrderItemState}

