import React, { useState } from "react";
import { useToDo } from "../Contexts";

function TodoItem({ ToDo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [TodoMsg, setTodoMsg] = useState(ToDo.ToDo)
    const {updateToDo, deleteToDo, toggleComplete} = useToDo()

    const editTodo = () => {
        console.log("Editing todo:", ToDo.id, TodoMsg);
        updateToDo(ToDo.id, {...ToDo, ToDo: TodoMsg})
        setIsTodoEditable(false)
    }
    const toggleCompleted = () => {
        toggleComplete(ToDo.id)
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                ToDo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={ToDo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${ToDo.completed ? "line-through" : ""}`}
                value={TodoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (ToDo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={ToDo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteToDo(ToDo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
