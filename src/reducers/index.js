import {combineReducers} from 'redux';
import courses from './CourseReducer';
import authors from './AuthorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses,  //this is called shorthand property name
    authors,
    ajaxCallsInProgress
});

export default rootReducer;