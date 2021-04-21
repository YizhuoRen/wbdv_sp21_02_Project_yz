import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home"
import SearchScreen from "./components/search-screen";
import DetailsScreen from "./components/details-screen";
import Login from "./components/users/login";
import Register from "./components/users/register";
import Profile from "./components/users/profile";
import DrinkPage from "./components/drinks/drink-page";
import VisitingProfile from "./components/users/visiting-profile";
import AdminPage from "./components/admins/admin-page";

function App() {
  return (
      <BrowserRouter>
        <div className="container-fluid">
          <Route path={["/", "/search", "/search/:name"]} exact={true}>
            <Home/>
          </Route>
          <Route path={["/admin"]} exact={true}>
            <AdminPage/>
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
          <Route path={["/profile",
            "/profile/user/check/followers",
            "/profile/user/check/following",
            "/profile/user/check/createDrink",
            "/profile/user/check/comments",
            "/profile/user/check/drinks"
          ]} exact={true}>
            <Profile/>
          </Route>
          <Route path={["/profile/:userId",
            "/profile/:userId/followers",
            "/profile/:userId/following",
            "/profile/:userId/comments",
            "/profile/:userId/drinks"
          ]} exact={true}>
            <VisitingProfile/>
          </Route>

          <Route path={["/drinks/:drinkId"]} exact={true}>
            <DrinkPage/>
          </Route>
        </div>
        {/*<Route path="/courses">*/}
        {/*  <CourseManager/>*/}
        {/*</Route>*/}
      </BrowserRouter>
  );
}

export default App;
