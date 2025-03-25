import type { Project } from "./types"

export const demoProjects: Project[] = [
  {
    id: "1",
    title: "Product Explainer Animation",
    clients: ["TechCorp"],
    status: "In Progress",
    releaseDate: "2025-04-15",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "/vercel.svg?height=200&width=300",
    type: "video",
    isFinalEdit: false,
    createdAt: "2025-01-15T10:00:00Z",
    comments: [
      {
        id: "c1",
        text: "The intro looks great! Can we make the logo animation a bit slower?",
        author: "client",
        timestamp: "2025-03-15T14:30:00Z",
        videoTime: 12.5,
      },
    ],
    annotations: [
      {
        id: "a1",
        text: "Logo needs to be larger here",
        author: "client",
        timestamp: "2025-03-15T14:35:00Z",
        videoTime: 15.2,
        position: { x: 50, y: 30 },
      },
    ],
  },
  {
    id: "2",
    title: "Corporate Brand Video",
    clients: ["GlobalFinance"],
    status: "Review",
    releaseDate: "2025-03-30",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    comments: [],
    annotations: [
      {
        id: "a1",
        text: "Logo needs to be larger here",
        author: "client",
        timestamp: "2025-03-15T14:35:00Z",
        videoTime: 15.2,
        position: { x: 50, y: 30 },
      },
    ],
    type: "video",
    isFinalEdit: false,
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "3",
    title: "Social Media Ad Campaign",
    clients: ["FashionBrand"],
    status: "Completed",
    releaseDate: "2025-02-28",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    comments: [],
    annotations: [
      {
        id: "a1",
        text: "Logo needs to be larger here",
        author: "client",
        timestamp: "2025-03-15T14:35:00Z",
        videoTime: 15.2,
        position: { x: 50, y: 30 },
      },
    ],
    type: "video",
    isFinalEdit: false,
    createdAt: "2025-01-15T10:00:00Z",
  },
]

