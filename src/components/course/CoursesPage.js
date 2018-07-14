import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/CourseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: { title: "" }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({course: course});
    }

    onClickSave() {
        //the dispatch is injected by connect
        //this.props.dispatch(courseActions.createCourse(this.state.course));

        //The createCourse function is wrapped in mapDispatchToProps function below.
        //If createCourse is not wrapped in a call to dispatch in mapDispatchToProps
        //then this call will directly to go the action in CourseActions.js.
        //But since we have mapped this prop (createCourse) in mapDispatchToProps
        //createCourse in mapDispatchToProps is first called.
        //this.props.createCourse(this.state.course);

        this.props.actions.createCourse(this.state.course);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }
    
    render() {
        //this is called destructuring. The value this.props.courses is now availalbe in {courses}
        const {courses} = this.props; 

        return (
            <div>
                <h1>Courses</h1>
                <CourseList courses={courses}/>

                {/*
                {this.props.courses.map(this.courseRow)}
                <h2>Add Course</h2>
                <input
                    type="text"
                    onChange={this.onTitleChange}
                    value={this.state.course.title} />

                <input
                    type="submit"
                    value="Save"
                    onClick={this.onClickSave} />
                */}

            </div>
        );
    }
}

CoursesPage.propTypes = {
    //dispatch: PropTypes.func.isRequired, /* If mapDispatchToProps is defined in connect then this dispatch propery is not recognized */
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
    //createCourse: PropTypes.func.isRequired   
};

//state - state within redux store. 
//state.courses - this is the courses defined in reducers/index.js
//courses - this can be accessed using this.props.courses within CoursesPage component
function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //createCourse: course => dispatch(courseActions.createCourse(course)) //this is when we dont use bindActionCreators pattern

        //all actions in courseActions are wrapped up in dispatch
        actions: bindActionCreators(courseActions, dispatch)
    };
}

//export default CoursesPage;

//Decorated by the react-redux connect function
//the connect function is what we use to create components that can 
//interact with redux. These components are the container components.
//connect is a higher order component and takes two parameters.
//connect returns a function, to this we pass CoursesPage component.
//second parameter to connect is optional, when removed component automatically gets a dispatch property attached to it
//and that is injected by connect.
//what is dispatch? dispatch will fire off different actions.

/*
connect function connects the react component to the store. It takes two functions, 
first function is used to specify the state you want to expose your component, 
the second function is used to specify the actions you’d like to expose.
*/
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);




