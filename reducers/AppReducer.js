'use client'

const appReducer = (state, action) => {
    switch (action.type) {
        case 'RETRIEVE_USER':
            return {
                ...state,
                user: action.payload, // Payload contains the user retrieved from local storage
            };
        case 'STORE-USER':
            return {
                ...state,
                user: action.payload, // Payload contains the user to be stored
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null, // Clear the user from the state
            }
        default: 
            return state;
    }
};

export default appReducer;