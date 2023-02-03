import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Auth from "./Auth"
import TaskFormContainer from "./list/TaskFormDialog";
import ListFormContainer from "./list/ListFormContainer";
import ListContainer from "./list/ListContainer";
import {LISTS, TASKS} from "./utils/routeNames";

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
          {/*<Route*/}
          {/*  path={`${LISTS}/:id?/:id?`}*/}
          {/*  element={<TaskFormContainer/>}*/}
          {/*/>*/}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
