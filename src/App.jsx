import { useEffect, useState } from 'react'
import {ToDoProvider} from './Contexts/index'
import './App.css'
import ToDoForm from './Components/ToDoForm'
import ToDoItem from './Components/ToDoItem'

function App() {
  const [ToDos, setToDos] = useState([])

  const addToDo = (ToDo) => {
    console.log("Adding todo to state:", ToDo);
    setToDos((prev) => [{id: Date.now(), ...ToDo},...prev])
  }

  const updateToDo = (id, ToDo) => {
    setToDos((prev) => prev.map((prevToDo) => (prevToDo.id === id ? ToDo : prevToDo)))
  }

  const deleteToDo = (id) => {
    setToDos((prev) => prev.filter((prevToDo) => prevToDo.id != id))
  }

  const toggleComplete = (id) => {
    setToDos((prev) => prev.map((prevToDo) => prevToDo.id === id ? {...prevToDo, completed: !prevToDo.completed} : prevToDo))
  }

  useEffect(() => {
      const ToDos = JSON.parse(localStorage.getItem("ToDos"))
      if(ToDos && ToDos.length > 0){
        setToDos(ToDos)
      }
  }, [])

  useEffect(() => {
      localStorage.setItem("ToDos", JSON.stringify(ToDos))
  }, [ToDos])

  return (
    <ToDoProvider value={{ToDos, addToDo, updateToDo, deleteToDo, toggleComplete}}>
  <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
                {/* Todo form goes here */} 
                <ToDoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {ToDos.map((ToDo) => (
                  <div key={ToDo.id}
                  className = 'w-full'>
                    <ToDoItem ToDo = {ToDo}/>

                  </div>
                ))}
            </div>
        </div>
    </div>
</ToDoProvider>
  )
}

export default App
