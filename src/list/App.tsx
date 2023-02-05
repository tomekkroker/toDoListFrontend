import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Auth from "./StartPage"
import ListFormContainer from "./ListFormContainer";
import ListContainer from "./ListContainer";
import {LISTS} from "../utils/routeNames";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Auth/>}
          />
          <Route
            path={LISTS}
            element={<ListContainer/>}
          />
          <Route
            path={`${LISTS}/:id?`}
            element={<ListFormContainer/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
