import { Route, Routes } from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import AboutPage from "./pages/AboutPage";
import AddTodoPage from "./pages/AddTodosPage";



function AppRoutes({todos, setTodos, isListLoading, loadListError, setCurrentTodo}) {
  
  

  return (
    <Routes>
      <Route path="/" element={<TodosPage todos={todos} setTodos={setTodos} setCurrentTodo={setCurrentTodo} isListLoading={isListLoading} loadListError={loadListError}></TodosPage>}></Route>
      <Route path="/about" element={<AboutPage></AboutPage>}></Route>
      <Route
        path="/add"
        element={<AddTodoPage setTodos={setTodos}></AddTodoPage>}
      ></Route>
    </Routes>
  );
}

export default AppRoutes;
