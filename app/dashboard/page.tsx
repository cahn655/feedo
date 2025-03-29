"use client"

import { useState } from "react"
import { Building, Filter, Plus, Search, X, HardDrive, ClockIcon, CheckCircle, PlayCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import DashboardNavbar from "@/components/dashboard-navbar"
import WorkspaceItem from "@/components/workspace-item"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState("")
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState("")
  const [newTeamMember, setNewTeamMember] = useState("")
  const [newTeamMemberPermission, setNewTeamMemberPermission] = useState("viewer"); // Default permission
  const [teamMembers, setTeamMembers] = useState<{ email: string; permission: string }[]>([])
  const [expandedWorkspace, setExpandedWorkspace] = useState<string | null>(null)
  const [workspaces, setWorkspaces] = useState<any[]>([])

  // Storage and stats data
  const storageUsed = 35 // percentage
  const storageTotal = 50 // GB
  const storageLeft = storageTotal - (storageTotal * storageUsed) / 100
  const pendingReviews = 5
  const completedProjects = 18
  const activeProjects = 24

  const handleAddTeamMember = () => {
    if (newTeamMember && !teamMembers.some((member) => member.email === newTeamMember)) {
      setTeamMembers([...teamMembers, { email: newTeamMember, permission: newTeamMemberPermission }])
      setNewTeamMember("")
      setNewTeamMemberPermission("viewer") // Reset to default
    }
  }

  const handleRemoveTeamMember = (email: string) => {
    setTeamMembers(teamMembers.filter((member) => member.email !== email))
  }

  const toggleWorkspace = (id: string) => {
    setExpandedWorkspace(expandedWorkspace === id ? null : id)
  }

  const handleCreateWorkspace = () => {
    if (newWorkspaceName.trim()) {
      const newWorkspace = {
        id: `workspace-${Date.now()}`,
        name: newWorkspaceName,
        description: newWorkspaceDescription,
        members: teamMembers.length,
        teamMembers: teamMembers,
        videos: 0,
        projects: [],
      }

      setWorkspaces([...workspaces, newWorkspace])

      // Reset form
      setNewWorkspaceName("")
      setNewWorkspaceDescription("")
      setTeamMembers([])
      setIsCreateWorkspaceOpen(false)
    }
  }

  const handleAddVideo = (workspaceId: string, videoData: any) => {
    setWorkspaces(
      workspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          const newProject = {
            id: `project-${Date.now()}`,
            title: videoData.title,
            thumbnail: videoData.thumbnail || "/placeholder.svg?height=150&width=250",
            status: "In Progress",
            dueDate: videoData.dueDate,
            client: workspace.name,
            type: "Video",
            videoUrl: videoData.videoUrl || null,
          }

          return {
            ...workspace,
            videos: workspace.videos + 1,
            projects: [...workspace.projects, newProject],
          }
        }
        return workspace
      }),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Workspaces</h1>
            <p className="text-gray-600">Manage your client workspaces and videos</p>
          </div>

          <Dialog open={isCreateWorkspaceOpen} onOpenChange={setIsCreateWorkspaceOpen}>
            <DialogTrigger asChild>
              <Button className="bg-sky-500 hover:bg-sky-600">
                <Plus className="mr-2 h-4 w-4" />
                Create New Workspace
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create new workspace</DialogTitle>
                <DialogDescription>Set up a workspace for your client and add team members</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <label htmlFor="workspace-name" className="text-sm font-medium">
                    Workspace Name
                  </label>
                  <Input
                    id="workspace-name"
                    placeholder="Enter client or workspace name"
                    className="w-full"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description (optional)
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe the purpose of this workspace"
                    className="w-full min-h-[100px]"
                    value={newWorkspaceDescription}
                    onChange={(e) => setNewWorkspaceDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Invite Team Members (up to 5)</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter email address"
                      value={newTeamMember}
                      onChange={(e) => setNewTeamMember(e.target.value)}
                      className="flex-1"
                    />
                    <select
                      value={newTeamMemberPermission}
                      onChange={(e) => setNewTeamMemberPermission(e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="editor">Editor</option>
                      <option value="client">Client</option>
                      <option value="viewer">Viewer</option>
                    </select>
                    <Button type="button" onClick={handleAddTeamMember} className="bg-sky-500 hover:bg-sky-600 px-3">
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>

                  {teamMembers.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Team members:</p>
                      <div className="space-y-2">
                        {teamMembers.map(({ email, permission }) => (
                          <div
                            key={email}
                            className="flex items-center justify-between bg-gray-100 rounded-md px-3 py-2"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-gray-800">{email}</span>
                              <span className="text-sm text-gray-500">({permission})</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveTeamMember(email)}
                              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button className="bg-sky-500 hover:bg-sky-600" onClick={handleCreateWorkspace}>
                  Create Workspace
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Storage and Stats */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Storage & Stats</h2>
            <Button variant="outline" size="sm">
              Upgrade Plan
            </Button>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Storage Usage</span>
              <span className="text-sm font-medium text-gray-700">
                {storageUsed}% of {storageTotal}GB used ({storageLeft.toFixed(1)}GB left)
              </span>
            </div>
            <Progress value={storageUsed} className="h-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-sky-100 p-2">
                  <HardDrive className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Storage Left</p>
                  <p className="font-semibold text-gray-900">{storageLeft.toFixed(1)}GB</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-100 p-2">
                  <ClockIcon className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Reviews</p>
                  <p className="font-semibold text-gray-900">{pendingReviews}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-100 p-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Projects</p>
                  <p className="font-semibold text-gray-900">{completedProjects}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <PlayCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Projects</p>
                  <p className="font-semibold text-gray-900">{activeProjects}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-auto md:min-w-[320px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search workspaces and projects..." className="pl-10" />
          </div>

          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="filter" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {workspaces.length > 0 ? (
          <div className="space-y-4">
            {workspaces.map((workspace) => (
              <WorkspaceItem
                key={workspace.id}
                workspace={workspace}
                isExpanded={expandedWorkspace === workspace.id}
                onToggle={() => toggleWorkspace(workspace.id)}
                onAddVideo={(videoData) => handleAddVideo(workspace.id, videoData)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Building className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No workspaces yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Create your first workspace to start organizing your video projects and collaborating with your team.
            </p>
            <Button className="bg-sky-500 hover:bg-sky-600" onClick={() => setIsCreateWorkspaceOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Workspace
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

