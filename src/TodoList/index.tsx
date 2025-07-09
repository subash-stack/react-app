import { useState } from "react";

type TodoType = {
  id: number;
  item: string;
  completed: boolean;
};
const TodoList = () => {
  const getTodoList = JSON.parse(localStorage.getItem("todo") ?? "[]");
  const [item, setItem] = useState("");
  const [todo, setTodo] = useState<Array<TodoType>>(getTodoList);
  const addTodoList = (lists: Array<TodoType>) =>
    localStorage.setItem("todo", JSON.stringify(lists));
  const updateTodo = (list: Array<TodoType>) => {
    setTodo(list);
    addTodoList(list);
  };
  const handleAddTodo = () => {
    const id = Date.now();
    const newList = [...todo, { id, item, completed: false }];
    updateTodo(newList);
    setItem("");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const deleteTodo = (id: number) => {
    const filterList = todo.filter((list) => list.id !== id);
    updateTodo(filterList);
  };
  const handleCompleted = (id: number) => {
    const updateCompletedTodo = todo.map((list) => ({
      ...list,
      completed: list.id === id ? !list.completed : list.completed,
    }));
    updateTodo(updateCompletedTodo);
  };
  const renderTodoList = () =>
    todo.map(({ id, item, completed }) => (
      <div key={id} className="flex items-center  gap-2">
        <button
          className={`text-xl  rounded-lg px-4 py-2 mb-2 flex items-center justify-between gap-2 cursor-pointer min-w-sm ${
            completed
              ? "bg-amber-400 hover:bg-amber-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => handleCompleted(id)}
        >
          {item}
        </button>
        {!completed && (
          <button
            className="bg-red-700 px-4 py-2 text-white rounded-full cursor-pointer"
            onClick={() => deleteTodo(id)}
          >
            X
          </button>
        )}
      </div>
    ));

  return (
    <div className="m-8">
      <h1 className="text-center text-2xl font-bold mb-4">Todo</h1>
      <form
        className="flex items-center gap-4 justify-center"
        onSubmit={handleSubmit}
      >
        <input
          className=" bg-gray-100 rounded-md p-4 min-w-sm"
          type="text"
          name="todo"
          placeholder="Add item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button
          type="submit"
          className="p-4 border rounded-md disabled:opacity-30"
          onClick={handleAddTodo}
          disabled={!item.length}
        >
          Add
        </button>
      </form>
      <div className="flex flex-col gap-4 items-center justify-center mt-4 ">
        {renderTodoList()}
      </div>
    </div>
  );
};

export default TodoList;
