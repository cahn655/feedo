import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto flex max-w-md flex-1 flex-col justify-center px-4 py-12">
        <div className="mb-6 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sky-500 text-white">
              <span className="text-xl font-bold">F</span>
            </div>
            <span className="text-xl font-medium text-gray-800">feedo</span>
          </Link>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Sign In</h1>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>

              <Link href="/forgot-password" className="text-sm text-sky-600 hover:text-sky-500">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{" "}
            <Link href="/signup" className="font-medium text-sky-600 hover:text-sky-500">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

