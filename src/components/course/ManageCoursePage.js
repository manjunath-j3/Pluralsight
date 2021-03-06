import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/CourseActions';
import {bindActionCreators} from 'redux';
import CourseForm from './CourseForm';
import taostr from 'toastr';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    //This function was necessary since when we refreshed the courses page
    //directly the form controls were all blank.
    //After adding this function if form controls are already populated then
    //doing refresh will repopulate the controls with proper values.
    
    //this react lifecycle function is called anytime props have changed or
    //when react thinks that props might have changed
    componentWillReceiveProps(nextProps) {
        if(this.props.course.id != nextProps.course.id) {
            //necessary to populate form when existing course is loaded directly.
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = Object.assign({}, this.state.course);
        course[field] = event.target.value;
        return this.setState({course: course});
    }
    
    saveCourse(event) {
        
        //set local state variable to indicate saving is in progress
        //we will rest this to false after saving is complete.
        this.setState({saving: true}); 

        event.preventDefault();
        this.props.actions.saveCourse(this.state.course)
        //.then -> wait until the save is complete, after save is complete then
        //only we redirect to the /courses page
        .then( () => this.redirect())
        //catch error, for e.g you click Save button without filling anything in the controls on the form.
        .catch( error => {
            taostr.error(error);
            this.setState({saving: false}); //make sure the saving flag is reset
        });
        
    }

    redirect() {

        //saving is done, reset the variable
        this.setState({saving: false});

        taostr.success('Course saved');

        //this will change the url to /courses
        this.context.router.push('/courses');
    }

    render() {
        return (
               <CourseForm 
                    allAuthors={this.props.authors}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    course={this.state.course}
                    errors={this.state.errors}
                    saving={this.state.saving}
                />
        );
    }
}

ManageCoursePage.propTypes = {
   course: PropTypes.object.isRequired,
   authors: PropTypes.array.isRequired,
   actions: PropTypes.object.isRequired
};

//Pull in the react router context so the router is available on this.context.router.
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};


function getCourseById(courses, id) {

    const course = courses.filter(course => course.id == id); 
    if(course.length){
         return course[0]; //since filter returns an array, have to grab the first element.
    }
    
    return null;
}

//state - state within redux store. 

function mapStateToProps(state, ownProps) {
    
    const courseId = ownProps.params.id; //from the path '/course/:id'
   
    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if (courseId && state.courses.length > 0) {
        //check for state.courses.length is needed because if you refresh, 
        //while in courses page then the courses in state may not be 
        //loaded yet, and accessing courses will lead to runtime error

        course = getCourseById(state.courses, courseId);
    }

    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);




