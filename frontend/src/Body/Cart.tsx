import React, {createContext, ReactNode, useReducer} from "react";

export type CartCarpet = {
    id: string;
    quantity: number;
};

type CartContext = {
    amount: number;
    carpets: CartCarpet[];
    addToCarpets: (id: string) => void;
    removeFromCarpets: (id: string) => void;
    resetCart: () => void;
};

type CartAction =
    | { type: "ADD_TO_CARPETS"; payload: string }
    | { type: "REMOVE_FROM_CARPETS"; payload: string }
    | { type: "RESET_CART"; };

const defaultValue: CartContext = {
    amount: 0,
    carpets: [],
    addToCarpets: () => {
    },
    removeFromCarpets: () => {
    },
    resetCart: () => {
    },
};

export const CartContext = createContext<CartContext>(defaultValue);

const cartReducer = (state: CartContext, action: CartAction): CartContext => {
    switch (action.type) {
        case "ADD_TO_CARPETS":
            const existingCarpet = state.carpets.find((carpet) => carpet.id === action.payload);

            if (existingCarpet) {
                const updatedCarpets = state.carpets.map((carpet) =>
                    carpet.id === action.payload ? {...carpet, quantity: carpet.quantity + 1} : carpet
                );

                return {...state, amount: state.amount + 1, carpets: updatedCarpets};
            } else {
                return {
                    ...state,
                    amount: state.amount + 1,
                    carpets: [...state.carpets, {id: action.payload, quantity: 1}]
                };
            }
        case "REMOVE_FROM_CARPETS":
            const removedCarpet = state.carpets.find((carpet) => carpet.id === action.payload);

            if (removedCarpet) {

                const updatedAmount = state.amount - removedCarpet.quantity;

                const updatedCarpets = state.carpets.filter((carpet) => carpet.id !== action.payload);

                return {...state, amount: updatedAmount, carpets: updatedCarpets};
            } else {
                return state;
            }
        case "RESET_CART":
            return {...state, amount: 0, carpets: []};
        default:
            return state;
    }
};

type CartContextProviderProps = {
    children: ReactNode;
};

export const CartContextProvider: React.FC<CartContextProviderProps> = ({children}) => {
    const [cartState, dispatch] = useReducer(cartReducer, defaultValue);

    const addToCarpets = (id: string) => {
        dispatch({type: "ADD_TO_CARPETS", payload: id});
    };

    const removeFromCarpets = (id: string) => {
        dispatch({type: "REMOVE_FROM_CARPETS", payload: id});
    };

    const resetCart = () => {
        console.log("Resetting cart...");
        dispatch({type: "RESET_CART"});
    };

    const contextValue: CartContext = {
        ...cartState,
        addToCarpets,
        removeFromCarpets,
        resetCart
    };


    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};