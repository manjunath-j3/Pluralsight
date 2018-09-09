import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course: course };
    /*
        in ES6 if LHS=RHS then we can write the above as 
        return { type: 'CREATE_COURSE', course };
    */
}

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
    
    //this is thunk function
    //A thunk always returns a function that accepts a dispatch
    return function(dispatch) {

        dispatch(beginAjaxCall());

        //here we call mock api getAllCourses (returns a promise)  to simulate server call
        return courseApi.getAllCourses().then( courses => {

            /* dispatch an action so that reducers that care can update the state */
            dispatch(loadCoursesSuccess(courses));
        }).catch( error => {
            throw(error);
        });
    };
}

export function saveCourse(course) {
    
    //this is thunk function
    //A thunk always returns a function that accepts a dispatch
    return function(dispatch, getState) {

        dispatch(beginAjaxCall());
        
        //here we call mock api saveCourse (returns a promise)  to simulate server call
        return courseApi.saveCourse(course).then( savedCourse => {

            course.id ? dispatch(updateCourseSuccess(savedCourse)):             
            dispatch(createCourseSuccess(savedCourse));
        }).catch( error => {
            dispatch(ajaxCallError(error));//this will stop the loading dots
            throw(error);
        });
    };
}