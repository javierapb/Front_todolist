"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AddTaskForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [responsable, setResponsable] = useState("")
  const [deadline, setDeadline] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, responsable, deadline }),
      })
      if (response.ok) {
        setTitle("")
        setDescription("")
        setResponsable("")
        setDeadline("")
        // You might want to add a callback here to refresh the task list
      } else {
        throw new Error("Failed to create task")
      }
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <Input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Responsable"
        value={responsable}
        onChange={(e) => setResponsable(e.target.value)}
        required
      />
      <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
      <Button type="submit" className="w-full">
        Agregar Tarea
      </Button>
    </form>
  )
}

