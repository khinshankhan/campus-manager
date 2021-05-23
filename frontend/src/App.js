import "./App.css";

//Router
import { Switch, Route } from "react-router-dom";
//Components
import {
  HomePageContainer,
  AllCampusesContainer,
  AllStudentsContainer,
  CampusContainer,
  StudentContainer,
  AddStudentContainer,
  AddCampusContainer,
  EditStudentContainer,
} from "./components/containers";

// if you create separate components for adding/editing
// a student or campus, make sure you add routes to those
// components here

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />

        <Route exact path="/campuses" component={AllCampusesContainer} />
        <Route exact path="/students" component={AllStudentsContainer} />

        <Route exact path="/campus/:id" component={CampusContainer} />
        <Route exact path="/student/:id" component={StudentContainer} />

        <Route exact path="/addcampus" component={AddCampusContainer} />
        <Route exact path="/addstudent" component={AddStudentContainer} />

        <Route exact path="/editstudent/:id" component={EditStudentContainer} />
      </Switch>
    </div>
  );
};

export default App;
