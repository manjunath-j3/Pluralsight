import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';

export function loadAuthorSuccess(authors) {
    return { type: types.LOAD_AUTHOR_SUCCESS, authors };
}

export function loadAuthors() {
    
    //this is thunk function
    //A thunk always returns a function that accepts a dispatch
    return function(dispatch) {

        //here we call mock api getAllAuthors (returns a promise)  to simulate server call
        return authorApi.getAllAuthors().then( authors => {

            /* dispatch an action so that reducers that care can update the state */
            dispatch(loadAuthorSuccess(authors));
        }).catch( error => {
            throw(error);
        });
    };
}