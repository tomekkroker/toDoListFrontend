import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Auth from "./Auth"
import TodoListsComponent from "./list/TodoListsComponent"
import CreateNewListComponent from "./list/CreateNewListComponent";
import CreateNewTaskComponent from "./list/CreateNewTaskComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth/>}/>
          <Route path="/lists" element={<TodoListsComponent/>}/>
          {/*docelowo po /lists bedzie nr id listy*/}
          <Route path="/lists/list" element={<CreateNewListComponent/>}/>
          {/*docelowo po /lists/1 bedzie nr id zadania*/}
          <Route path="/lists/list/task" element={<CreateNewTaskComponent/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
