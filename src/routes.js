import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';

export default (
    <Route path="/" component={App}>

        /* the {App} will always be loaded by placing it above.
            {App} is the parent and two child components {HomePage}
            and {AboutPage} are nested and passed as children based
            on the routing. i.e if we have a url that is just 
            homepage then we pass {HomePage} as a child to App component,
            else if the url has /about then {AboutPage} is passed 
            as child component to {App} */

        /* IndexRoute is used when there is just root path like '/' 
            meaning, if somebody uses the slash / then we will go to HomePage*/
        <IndexRoute component={HomePage} />

        <Route path="courses" component={CoursesPage} />
        <Route path="course/*" component={ManageCoursePage} />
        <Route path="course:/id" component={ManageCoursePage} />

        /* if the path is "/about" then we load the AboutPage */
        <Route path="about" component={AboutPage} />

    </Route>
);
