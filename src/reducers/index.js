import {combineReducers} from 'redux';
import courses from './CourseReducer';

const rootReducer = combineReducers({
    courses  //this is called shorthand property name
});

export default rootReducer;