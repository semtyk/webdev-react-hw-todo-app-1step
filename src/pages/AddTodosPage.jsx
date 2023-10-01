import { AddTodoForm } from "../components/AddTodoForm";

export default function AddTodoPage({ setTodos }) {
  return (
    <div className="page">
      <h1>Страница добавления задачи</h1>
      <AddTodoForm setTodos={setTodos} />
    </div>
  );
}