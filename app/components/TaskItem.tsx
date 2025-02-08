"use client"

import { useState } from "react"
import type { Task } from "../types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface TaskItemProps {
  task: Task
  onTaskUpdated: () => void
}

export default function TaskItem({ task, onTaskUpdated }: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(task.completed)

  const handleComplete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !isCompleted }),
      })
      if (response.ok) {
        setIsCompleted(!isCompleted)
      } else {
        throw new Error("Failed to update task")
      }
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task._id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        onTaskUpdated()
      } else {
        throw new Error("Failed to delete task")
      }
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  return (
    <Card className={isCompleted ? "bg-gray-100" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Checkbox checked={isCompleted} onCheckedChange={handleComplete} />
          <span className={isCompleted ? "line-through" : ""}>{task.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500">Responsable: {task.responsable}</p>
        <p className="text-sm text-gray-500">Fecha límite: {new Date(task.deadline).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={handleDelete}>
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  )
}

