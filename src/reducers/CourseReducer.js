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

        case types.CREATE_COURSE_SUCCESS:
            //the spread operator ...state explodes each element in the state inline. 
            //The new course is then appended. NOTE: we are not mutating the state.
            return [
                ...state,
                Object.assign({}, action.course)
            ];

        case types.UPDATE_COURSE_SUCCESS:
            //the spread operator ...state explodes each element in the state inline. 
            //we then apply filter function, this filter will exclude the item
            //action.course.id in the state (course).
            //The new course is then appended. NOTE: we are not mutating the state.
            return [
                ...state.filter(course => course.id !== action.course.id),
                Object.assign({}, action.course)
            ];

        default:
            return state;
    }
}
