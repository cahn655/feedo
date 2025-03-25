"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MoreVertical, Play, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    thumbnail: string
    status: string
    dueDate: string
    client: string
    type: string
    videoUrl?: string | null
  },
  workspaceId: string
}

export default function ProjectCard({ project, workspaceId }: ProjectCardProps) {
  const [status, setStatus] = useState(project.status)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Pending Review":
        return "bg-amber-100 text-amber-700"
      case "Approved":
        return "bg-green-100 text-green-700"
      case "Rejected":
        return "bg-red-100 text-red-700"
      case "Completed":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative">
        <Link href={`/workspace/${workspaceId}/video/${project.id}`}>
          <Image
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.title}
            width={250}
            height={150}
            className="h-36 w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-sky-600">
              <Play className="h-6 w-6" />
            </div>
          </div>
        </Link>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <Link href={`/workspace/${workspaceId}/video/${project.id}`} className="hover:underline">
            <h3 className="font-medium text-gray-900">{project.title}</h3>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className={`h-7 text-xs font-medium ${getStatusColor(status)}`}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Pending Review">Pending Review</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="mr-1.5 h-3.5 w-3.5" />
            Due: {project.dueDate}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <User className="mr-1.5 h-3.5 w-3.5" />
            Client: {project.client}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <svg
              className="mr-1.5 h-3.5 w-3.5"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1="12" x2="12" y1="22" y2="12" />
            </svg>
            Type: {project.type}
          </div>
        </div>
      </div>
    </div>
  )
}

