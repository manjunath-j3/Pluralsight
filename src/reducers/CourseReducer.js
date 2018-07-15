import * as types from '../actions/actionTypes';
import initialState from './InitialState';

export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case types.CREATE_COURSE:
            return [...state,
                Object.assign({}, action.course)
                ];

        case types.LOAD_COURSES_SUCCESS:
            return action.courses;

        default:
            return state;
    }
}
