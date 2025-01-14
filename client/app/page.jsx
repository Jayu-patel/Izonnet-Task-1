import TodoList from "./components/todoList/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">To-Do List</h1>
        <TodoList />
      </div>
    </div>
  );
}
