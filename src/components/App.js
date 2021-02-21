import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import PageNotFound from './PageNotFound';

import CoursesPage from './courses/CoursesPage';
import ManageCoursesPage from './courses/ManageCoursePages';

const App = () => {
  return(
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursesPage} />
        <Route path="/course" component={ManageCoursesPage} />
        <Route component={PageNotFound}/>
      </Switch>
    </div>
  );
};

export default App;