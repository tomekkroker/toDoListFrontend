import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Auth from "./Auth"
import TodoListsComponent from "./TodoListsComponent"
import CreateNewListComponent from "./CreateNewListComponent";

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
