//This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header
                    loading={this.props.loading}
                />

                {/*comment-  children will be passed in from react-router. react-router
                will pass in child components as properties onto the App component.
                see routes.js */}

                {this.props.children}
                
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    //alert(state.ajaxCallsInProgress > 0);

    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(App);
