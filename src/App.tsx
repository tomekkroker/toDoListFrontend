import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Auth from "./Auth"
import TodoListsComponent from "./list/TodoListsComponent"
import CreateNewListComponent from "./list/CreateNewListComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth/>}/>
          <Route path="/lists" element={<TodoListsComponent/>}/>
          <Route path="/lists/create" element={<CreateNewListComponent/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
