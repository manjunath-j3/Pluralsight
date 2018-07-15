import {combineReducers} from 'redux';
import courses from './CourseReducer';
import authors from './AuthorReducer';

const rootReducer = combineReducers({
    courses,  //this is called shorthand property name
    authors
});

export default rootReducer;