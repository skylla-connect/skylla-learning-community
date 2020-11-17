
const OrderStateContext = React.createContext()
const OrderDispatchContext = React.createContext()

const initialState = {
    orderPlaced: false,
    isLoading: false,
    error: null
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "order-init":
            return initialState;
        case "order":
            return {
                ...state,
                orderPlaced: false,
                isLoading: true,
                error: null
            }

        case "success":
            return {
                ...state,
                orderPlaced: true,
                isLoading: false
            }

        case "failure":
            return {
                ...state,
                isLoading: false,
                error: payload.error
            }

        default:
            return state;
    }
}

export default orderReducer;

function orderProvider({children}) { 
    const [state, dispatch] = React.useReducer(orderReducer, initialState )
    return (
      <OrderStateContext.Provider value={state}>
        <OrderDispatchContext.Provider value={dispatch}>
          {children}
        </OrderDispatchContext.Provider>
      </OrderStateContext.Provider>
    )
  }

export default (orderProvider);