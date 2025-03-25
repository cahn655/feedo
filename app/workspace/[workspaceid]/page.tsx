import Link from "next/link"
import { ChevronLeft, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardNavbar from "@/components/dashboard-navbar"
import DashboardSidebar from "@/components/dashboard-sidebar"
import ProjectCard from "@/components/project-card"

export default function WorkspacePage({ params }: { params: { id: string } }) {
  // Sample workspace data
  const workspace = {
    id: params.id,
    name:
      params.id === "1"
        ? "Design Team"
        : params.id === "2"
          ? "Marketing"
          : params.id === "3"
            ? "Product Development"
            : "Client Projects",
    members: 8,
    description: "Collaborative workspace for design projects and feedback",
  }

  // Sample projects data
  const projects = [
    {
      id: "1",
      title: "Brand Video Redesign",
      thumbnail: "/placeholder.svg?height=150&width=250",
      updatedAt: "Updated 2 days ago",
      progress: 75,
    },
    {
      id: "2",
      title: "Product Launch Video",
      thumbnail: "/placeholder.svg?height=150&width=250",
      updatedAt: "Updated 5 days ago",
      progress: 40,
    },
    {
      id: "3",
      title: "Client Testimonial",
      thumbnail: "/placeholder.svg?height=150&width=250",
      updatedAt: "Updated 1 week ago",
      progress: 90,
    },
    {
      id: "4",
      title: "Tutorial Series",
      thumbnail: "/placeholder.svg?height=150&width=250",
      updatedAt: "Updated 2 weeks ago",
      progress: 20,
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{workspace.name}</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500">{workspace.description}</p>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
              <p className="text-sm text-gray-500">Manage your video projects</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search projects..." className="pl-10 w-64" />
              </div>
              <Button className="bg-sky-500 hover:bg-sky-600">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          {/* Projects */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} workspaceId={workspace.id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

