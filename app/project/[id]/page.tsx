"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Share2, ArrowLeft, Send, Pause, Play } from "lucide-react"
import type { Project, Comment, Annotation } from "@/lib/types"
import { demoProjects } from "@/lib/demo-data"
import ShareProjectDialog from "@/components/share-project-dialog"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const [comment, setComment] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isAnnotating, setIsAnnotating] = useState(false)
  const [annotationText, setAnnotationText] = useState("")
  const [annotationPosition, setAnnotationPosition] = useState({ x: 0, y: 0 })

  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/")
      return
    }
    setUser(JSON.parse(storedUser))

    // Load projects
    const storedProjects = localStorage.getItem("projects")
    const projects = storedProjects ? JSON.parse(storedProjects) : demoProjects

    // Find the current project
    const currentProject = projects.find((p: Project) => p.id === params.id)
    if (!currentProject) {
      router.push("/dashboard")
      return
    }

    setProject(currentProject)
  }, [params.id, router])

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("play", handlePlay)
    videoElement.addEventListener("pause", handlePause)

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("play", handlePlay)
      videoElement.removeEventListener("pause", handlePause)
    }
  }, [])

  const handlePlayPause = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  const handleAddComment = () => {
    if (!comment.trim() || !project || !user) return

    const newComment: Comment = {
      id: Date.now().toString(),
      text: comment,
      author: user.username,
      timestamp: new Date().toISOString(),
      videoTime: currentTime,
    }

    const updatedProject = {
      ...project,
      comments: [...project.comments, newComment],
    }

    updateProject(updatedProject)
    setComment("")
  }

  const handleVideoClick = (e: React.MouseEvent) => {
    if (!isAnnotating || !videoContainerRef.current || !videoRef.current) return

    const rect = videoContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setAnnotationPosition({ x, y })
    videoRef.current.pause()
  }

  const handleAddAnnotation = () => {
    if (!annotationText.trim() || !project || !user) return

    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      text: annotationText,
      author: user.username,
      timestamp: new Date().toISOString(),
      videoTime: currentTime,
      position: annotationPosition,
    }

    const updatedProject = {
      ...project,
      annotations: [...project.annotations, newAnnotation],
    }

    updateProject(updatedProject)
    setAnnotationText("")
    setIsAnnotating(false)
  }

  const updateProject = (updatedProject: Project) => {
    setProject(updatedProject)

    // Update in localStorage
    const storedProjects = localStorage.getItem("projects")
    const projects = storedProjects ? JSON.parse(storedProjects) : demoProjects
    const updatedProjects = projects.map((p: Project) => (p.id === updatedProject.id ? updatedProject : p))

    localStorage.setItem("projects", JSON.stringify(updatedProjects))
  }

  const toggleShareAccess = () => {
    if (!project) return

    const updatedProject = {
      ...project,
      clientAccess: !project.clientAccess,
    }

    updateProject(updatedProject)
    setIsShareDialogOpen(false)
  }

  if (!project || !user) return null

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="bg-slate-900 p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-xl font-bold truncate">{project.title}</h1>
          <div className="ml-auto flex items-center gap-2">
            <Badge className="bg-blue-900">{project.status}</Badge>
            {user.role === "animator" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsShareDialogOpen(true)}
                className="border-slate-700"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative" ref={videoContainerRef}>
              <video
                ref={videoRef}
                src={project.videoUrl}
                className="w-full bg-black rounded-md"
                onClick={handleVideoClick}
              />

              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" onClick={handlePlayPause} className="text-white">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <div className="ml-2 text-sm">
                    {formatTime(currentTime)} / {formatTime(videoRef.current?.duration || 0)}
                  </div>
                </div>
              </div>

              {/* Annotations */}
              
              {project.annotations.map((annotation) => (
                <div
                  key={annotation.id}
                  className="absolute w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${annotation.position.x}%`,
                    top: `${annotation.position.y}%`,
                    display: Math.abs(annotation.videoTime - currentTime) < 0.5 ? "flex" : "none",
                  }}
                  title={annotation.text}
                >
                  <span className="text-xs">{annotation.id.slice(-1)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Project Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Client:</span> {project.client}
                </div>
                <div>
                  <span className="text-slate-400">Release Date:</span>{" "}
                  {new Date(project.releaseDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="text-slate-400">Status:</span> {project.status}
                </div>
                <div>
                  <span className="text-slate-400">Shared with client:</span> {project.clientAccess ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-md p-4 border border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Comments</h2>
              {user.role === "client" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAnnotating(!isAnnotating)}
                  className={`border-slate-700 ${isAnnotating ? "bg-blue-900" : ""}`}
                >
                  {isAnnotating ? "Cancel Annotation" : "Add Annotation"}
                </Button>
              )}
            </div>

            {isAnnotating && (
              <div className="mb-4 p-3 bg-slate-800 rounded-md">
                <p className="text-sm mb-2">Click on the video to place an annotation</p>
                <Textarea
                  value={annotationText}
                  onChange={(e) => setAnnotationText(e.target.value)}
                  placeholder="Add annotation note..."
                  className="bg-slate-700 border-slate-600 mb-2"
                />
                <Button onClick={handleAddAnnotation} size="sm" className="bg-blue-900 hover:bg-blue-800">
                  Add Annotation
                </Button>
              </div>
            )}

            <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
              {project.comments.length === 0 ? (
                <p className="text-slate-500 text-center py-4">No comments yet</p>
              ) : (
                project.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-700 text-xs">
                        {comment.author.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium">{comment.author}</div>
                        <div className="text-xs text-slate-500">
                          {new Date(comment.timestamp).toLocaleTimeString()} at {formatTime(comment.videoTime)}
                        </div>
                      </div>
                      <p className="text-sm mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="bg-slate-800 border-slate-700"
              />
              <Button onClick={handleAddComment} className="bg-blue-900 hover:bg-blue-800">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <ShareProjectDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        project={project}
        onToggleAccess={toggleShareAccess}
      />
    </div>
  )
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

