import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home"
import SearchScreen from "./components/search-screen";
import DetailsScreen from "./components/details-screen";

function App() {
  return (
      <BrowserRouter>
        <div className="container-fluid">
          <Route path="/" exact={true}>
            <Home/>
          </Route>
          <Route path={["/search", "/search/:name"]} exact={true}>
            <SearchScreen/>
          </Route>
          <Route path={["/details", "/details/:drinkId"]} exact={true}>
            <DetailsScreen/>
          </Route>
        </div>
          {/*<Route path="/courses">*/}
          {/*  <CourseManager/>*/}
          {/*</Route>*/}
      </BrowserRouter>
  );
}

export default App;
