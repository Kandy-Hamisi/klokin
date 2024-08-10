'use client'

import appReducer from "@/reducers/AppReducer"
import React, { useContext, useReducer, useState } from 'react';

const GlobalContext = React.createContext();

const initialState = {
    user: null,
}

export const GlobalProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(appReducer, initialState);

    // Retrieve user from local storage
    const retrieveUser = () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'RETRIEVE_USER', payload: user });
        }
    }

    // store the user after login
    const storeUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'STORE_USER', payload: user });
    }

    // log out user
    const logoutUser = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <GlobalContext.Provider value={{
            retrieveUser,
            storeUser,
            logoutUser,
            state
        }}>
            { children }
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}