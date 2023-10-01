
import { useEffect, useState } from "react";
import AppRoutes from "./AppRoutes";
import { getTodos } from "./api";
import { Link } from "react-router-dom";


function App() {
  const [todos, setTodos] = useState([
  ]);

  const [isListLoading, setIsListLoading] = useState(false);   //стейт для хранения статуса загрузки листа
  const [loadListError, setLoadListError] = useState(null);    // стейт для хранения сообщения ошибки от сервера при загрузке листа
  const [currentTodo, setCurrentTodo] = useState(null);       //Стейт для выделения текущей задачи

  // а.2 Добавляем получение из АПИ массива задач, вызывая функцию из api.js getTodos
  // getTodos().then((todos) => {
  //   console.log(todos.todos)
  //   setTodos(todos.todos)
  // })
  
  // а.3 UseEffect для того, чтобы срабатывало один раз
  useEffect(()=>{
    setLoadListError(null);   //Обнуляем стейт ошибки ответа от сервера
    setIsListLoading(true);   //Ставим стейт загрузки в состояние вкл
    getTodos().then((todos) => {    
        console.log(todos.todos);   
        setTodos(todos.todos);      //при успешном получении ответа от сервера, обновляем стейт данных
    }).catch ((error)=> {
        setLoadListError(error.message);    //при ошибке от сервера сохраняем месседж ошибки в стейт
    }).finally (()=> {
        setIsListLoading(false);            //в любом случае, ставим стейт загрузки в состяние выкл
    })
      
    }, [])

  return (
  <>
    {currentTodo ? (
        <div className="current-task">Текущая задача: {currentTodo.text}</div>
      ) : null}
    <h3>Навигация</h3>
      <Link to="/">Задачи</Link>
      <br />
      <Link to="/add">Добавить задачу</Link>
      <br />
      <Link to="/about">О проекте</Link>
      <br />
      <br />
  <AppRoutes todos={todos} setTodos={setTodos} setCurrentTodo={setCurrentTodo} isListLoading={isListLoading} loadListError={loadListError}></AppRoutes>;
  </>)
}

export default App;
