import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import UserSignUp from './Components/UserSignUp';
import Forbidden from './Components/Forbidden';
import NotFound from './Components/NotFound';
import PrivateRoute from './Components/PrivateRoute';
import UnhandledError from './Components/UnhandledError';
import withContext from './Context';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);


const App = () => {
  return (
    <Router>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route exact path="/courses">
          <Redirect to="/" />
        </Route>
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} /> 
        <Route path="/signup" component={UserSignUpWithContext}/>
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
