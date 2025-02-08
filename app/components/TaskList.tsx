"use client"

import { useState, useEffect } from "react"
import type { Task } from "../types"
import TaskItem from "./TaskItem"

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`)
        if (!res.ok) {
          throw new Error("Failed to fetch tasks")
        }
        const data = await res.json()
        setTasks(data)
      } catch (err) {
        console.log(err)
        setError("Error fetching tasks. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  if (isLoading) return <div>Loading tasks...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onTaskUpdated={() => setTasks(tasks.filter((t) => t._id !== task._id))} />
      ))}
    </ul>
  )
}

