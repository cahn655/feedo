import Link from "next/link"
import { LayoutGrid, Users, HardDrive, Settings, Video, MessageSquare, Clock, Star, Building } from "lucide-react"

export default function DashboardSidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-white md:flex md:flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5">
        <nav className="flex-1 space-y-1 px-2">
          <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Main</div>

          <Link
            href="/dashboard"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-sky-600 bg-sky-50"
          >
            <LayoutGrid className="mr-3 h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="/dashboard"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Building className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            Workspaces
          </Link>

          <Link
            href="/projects"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Video className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            Projects
          </Link>

          <Link
            href="/comments"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <MessageSquare className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            Comments
          </Link>

          <Link
            href="/team"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Users className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            Team
          </Link>

          <div className="mt-8 mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Library</div>

          <Link
            href="/recent"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Clock className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            Recent
          </Link>

          <Link
            href="/favorites"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Star className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            Favorites
          </Link>

          <Link
            href="/storage"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <HardDrive className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            Storage
          </Link>

          <div className="mt-8 mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Settings</div>

          <Link
            href="/settings"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            Settings
          </Link>
        </nav>

        <div className="m-4 rounded-lg bg-sky-50 p-4">
          <h3 className="text-sm font-medium text-sky-800">Need help?</h3>
          <p className="mt-1 text-xs text-sky-700">Check our documentation or contact support for assistance.</p>
          <button className="mt-3 w-full rounded-md bg-white px-2 py-1.5 text-xs font-medium text-sky-600 shadow-sm hover:bg-sky-50">
            View Documentation
          </button>
        </div>
      </div>
    </aside>
  )
}

