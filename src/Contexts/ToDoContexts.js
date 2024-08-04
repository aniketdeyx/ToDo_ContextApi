import { createContext, useContext } from "react";

export const ToDoContexts = createContext({
    ToDos: [
        {
            id: 1,
            ToDo: "ToDo msg",
            completed: false
        }
    ],
    addToDo: (ToDo) => {},
    updateToDo: (id, ToDo) => {},
    deleteToDo: (id) => {},
    toggleComplete: (id) => {}
})

export const useToDo = () => {
    return useContext(ToDoContexts)
}

export const ToDoProvider = ToDoContexts.Provider