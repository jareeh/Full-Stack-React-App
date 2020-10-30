import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import UserSignUp from './Components/UserSignUp';
//import Forbidden from './Components/Forbidden';
import NotFound from './Components/NotFound';

import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const CourseDetailWithContext = withContext(CourseDetail);


const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} /> 
        <Route path="/signup" component={UserSignUpWithContext}/>
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOut} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
