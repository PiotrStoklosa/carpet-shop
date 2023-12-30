import React, {createContext, ReactNode, useReducer} from "react";
import {Carpet} from "./Body";

export type CartCarpet = {
    carpet: Carpet;
    quantity: number;
};

type CartContext = {
    amount: number;
    carpets: CartCarpet[];
    addToCarpets: (carpet: Carpet) => void;
    removeFromCarpets: (id: string) => void;
    resetCart: () => void;
};

type CartAction =
    | { type: "ADD_TO_CARPETS"; payload: Carpet }
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
            const existingCarpet = state.carpets.find((carpet) => carpet.carpet._id === action.payload._id);

            if (existingCarpet) {
                const updatedCarpets = state.carpets.map((carpet) =>
                    carpet.carpet._id === action.payload._id ? {...carpet, quantity: carpet.quantity + 1} : carpet
                );

                return {...state, amount: state.amount + 1, carpets: updatedCarpets};
            } else {
                return {
                    ...state,
                    amount: state.amount + 1,
                    carpets: [...state.carpets, {carpet: action.payload, quantity: 1}]
                };
            }
        case "REMOVE_FROM_CARPETS":
            const removedCarpet = state.carpets.find((carpet) => carpet.carpet._id === action.payload);

            if (removedCarpet) {
                if (removedCarpet.quantity === 1) {
                    const updatedAmount = state.amount - removedCarpet.quantity;

                    const updatedCarpets = state.carpets.filter((carpet) => carpet.carpet._id !== action.payload);

                    return {...state, amount: updatedAmount, carpets: updatedCarpets};
                }
                else{
                    const updatedCarpets = state.carpets.map((carpet) =>
                        carpet.carpet._id === action.payload ? {...carpet, quantity: carpet.quantity - 1} : carpet
                    );

                    return {...state, amount: state.amount - 1, carpets: updatedCarpets};
                }
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

    const addToCarpets = (carpet: Carpet) => {
        dispatch({type: "ADD_TO_CARPETS", payload: carpet});
    };

    const removeFromCarpets = (id: string) => {
        dispatch({type: "REMOVE_FROM_CARPETS", payload: id});
    };

    const resetCart = () => {
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