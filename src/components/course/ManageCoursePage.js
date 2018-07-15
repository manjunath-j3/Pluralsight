import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/CourseActions';
import {bindActionCreators} from 'redux';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {}
        };
    }
    
    render() {
        return (
               <CourseForm 
                    allAuthors={this.props.authors}
                    course={this.state.course}
                    errors={this.state.errors}
                />
        );
    }
}

ManageCoursePage.propTypes = {
   course: PropTypes.object.isRequired,
   authors: PropTypes.array.isRequired
};

//state - state within redux store. 
//state.xxxc - this is the authors defined in reducers/index.js

function mapStateToProps(state, ownProps) {

    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
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




