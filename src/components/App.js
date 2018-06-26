//This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header/>

                {/*comment-  children will be passed in from react-router. react-router
                will pass in child components as properties onto the App component.
                see route.js */}

                {this.props.children}
                
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
