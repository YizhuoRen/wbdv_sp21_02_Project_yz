import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home"
import SearchScreen from "./components/search-screen";
import DetailsScreen from "./components/details-screen";
import Login from "./components/users/login";
import Register from "./components/users/register";
import Profile from "./components/users/profile";

function App() {
  return (
      <BrowserRouter>
        <div className="container-fluid">
          <Route path={["/", "/search", "/search/:name"]} exact={true}>
            <Home/>
          </Route>
          <Route path={["/search", "/search/:name"]} exact={true}>
            <SearchScreen/>
          </Route>
          <Route path={["/details", "/details/:drinkId"]} exact={true}>
            <DetailsScreen/>
          </Route>
          <Route path={["/login"]} exact={true}>
            <Login/>
          </Route>
          <Route path={["/register"]} exact={true}>
            <Register/>
          </Route>
          <Route path={["/profile"]}>
            <Profile/>
          </Route>
        </div>
          {/*<Route path="/courses">*/}
          {/*  <CourseManager/>*/}
          {/*</Route>*/}
      </BrowserRouter>
  );
}

export default App;
