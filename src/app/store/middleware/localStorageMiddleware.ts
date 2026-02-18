import {isAction, type Middleware} from "@reduxjs/toolkit";

const USER_ACTIONS = ['bank/addUser', 'bank/addToken', 'bank/clearUserData'];

export const localStorageMiddleware: Middleware =
    store => next => action => {

    if(!isAction(action)) {
        return next(action);
    }
        const result = next(action);

        if (USER_ACTIONS.includes(action.type)) {

            const state = store.getState().bank;

            if (state.user || state.token) {
                localStorage.setItem('bank_user', JSON.stringify(state.user));
                localStorage.setItem('bank_token', state.token);
            }

            if (action.type === 'bank/clearUserData') {
                localStorage.removeItem('bank_user');
                localStorage.removeItem('bank_token');
            }

        }
        return result;

};

