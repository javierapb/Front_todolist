import TaskList from "./components/TaskList"
import AddTaskForm from "./components/AddTaskForm"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Tareas</h1>
      <AddTaskForm />
      <TaskList />
    </div>
  )
}

