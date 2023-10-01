import { useState } from "react";
import { delTodos} from "../api";

function TodosList({key, text, onShow, isActive, Error, isActiveError, activateCurrentTodo}) {
  return (
    <li key={key} onClick={activateCurrentTodo} className="todo-item">{text}
            <button disabled={isActive} onClick={onShow}>{isActive? 'Задача удаляется...':'Удалить'}</button>
            {isActiveError && <p style={{color: 'red'}}>{Error}</p>}
    </li>
  );
}

export default function TodosPage({setTodos, todos, setCurrentTodo, isListLoading, loadListError}) {
  
 const [isTodoDelete, setIsTodoDelete] = useState(-1);    //стейт для ханения key элемента списка, кнопку которого нажали
 const [deleteTodoError, setDeleteTodoError] = useState(null);  // стейт для хранения сообщения ошибки от сервера при удалении элемента
 const [deleteTodoErrorId, setDeleteTodoErrorId] = useState(-1); // стейт для хранения key элемента списка, по которому пришла ошибка 
 
  // Обработчик удаления задачи 
  const handleDeleteTask = (key) => {
    return async () => {
      try {
      setDeleteTodoError(null);       // Обнуляем стейт ошибки ответа от сервера
      setDeleteTodoErrorId(-1);       // Обнуляем адрес куда выводить ошибку

        // в.4 добавляем лоадер на текущую кнопку пока задача удаляется
      setIsTodoDelete(key)        

      // в.2 по клику на удалить задачу делаем запрос в апи на удаление задачи
      const newTodos = await delTodos(key);

      // в.3 через стейт обновляем список задач
      setTodos(newTodos.todos);

      } catch (error) {
        setDeleteTodoError(error.message);  //при ошибке от сервера сохраняем в стейт месседж ошибки
        setDeleteTodoErrorId(key);          // И сохраняем текущий адрес куда выводить ошибку 
      } finally {
        setIsTodoDelete(-1);                // в любом случае убираем лоадер на текущую кнопку удаления задачи
      }
  }}






  return (
    <div className="page">
      <h1>Список задач</h1>
      {!isListLoading ?  
      <ul>
      {todos.map((todo) => 
        <TodosList key={todo.id} text={todo.text} 
        onShow={handleDeleteTask(todo.id)} isActive={isTodoDelete===todo.id} 
        Error={deleteTodoError} isActiveError={deleteTodoErrorId===todo.id}
        activateCurrentTodo={()=>setCurrentTodo(todo)}/>
      )}
    </ul>
      : <h2>Список загружается...</h2>}
      <p style={{color: 'red'}}>{loadListError}</p>

    </div>
  );
}

