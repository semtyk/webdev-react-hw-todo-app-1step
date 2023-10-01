import { useState } from "react";
import { postTodos } from "../api";

export function AddTodoForm({ setTodos}) {
  const [newTodoText, setNewTodoText] = useState("");
  const [isNewTodoLoading, setIsNewTodoLoading] = useState(false);
  const [addTodoError, setAddTodoError] = useState(null);

  const handleAddTodoClick = async () => {
    try {
      if (!newTodoText) {
        return;
      }
      setAddTodoError(null);
      //б.4 дизейблим кнопку
      setIsNewTodoLoading(true);
      // б.2 по клику на добавить задачу делаем запрос в апи на добавление задачи
      const newTodos = await postTodos(newTodoText);
      // б.3 через стейт обновляем список задач
      setTodos(newTodos.todos);
      setNewTodoText("");
    } catch (error) {
      setAddTodoError(error.message);
    } finally {
      setIsNewTodoLoading(false);
    }
    
  };

  return (
    <div>
      <h3>Добавить задачу</h3>
      <input
        value={newTodoText}
        onChange={(event) => {
          setNewTodoText(event.target.value);
        }}
      />
      <p style={{color: 'red'}}>{addTodoError}</p>
      <button disabled={isNewTodoLoading} onClick={handleAddTodoClick}>{isNewTodoLoading?"задача добавляется...":'Добавить '}</button>
    </div>
  );
}
