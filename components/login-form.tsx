"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("animator")
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // For demo purposes, check for the dummy credentials
    if (isSignUp || (username === "bub" && password === "hello")) {
      // Store user info in localStorage for demo purposes
      localStorage.setItem(
        "user",
        JSON.stringify({
          username,
          role,
          isLoggedIn: true,
        }),
      )

      toast.success("Login successful")
      router.push("/dashboard")
    } else {
      toast.error("Authentication failed", {
        description: "Please use username: 'bub' and password: 'hello'",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-white">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          className="bg-slate-800 border-slate-700 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="bg-slate-800 border-slate-700 text-white"
        />
      </div>
      { isSignUp ? 
        <div className="space-y-2">
          <Label className="text-white">I am a:</Label>
          <RadioGroup value={role} onValueChange={setRole} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="animator" value="animator" className="border-white" />
              <Label htmlFor="animator" className="text-white">
                Animator
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="client" value="client" className="border-white" />
              <Label htmlFor="client" className="text-white">
                Client
              </Label>
            </div>
          </RadioGroup>
        </div>
        : null
      }

      <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white">
        {isSignUp ? "Sign Up" : "Login"}
      </Button>

      <div className="text-center">
        <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-blue-400 hover:underline text-sm">
          {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </form>
  )
}

