"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
  videoUrl: string
  thumbnailUrl?: string
}

export default function VideoPlayer({ videoUrl, thumbnailUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      if (isPlaying) {
        video.pause()
        setIsPlaying(false)
      } else {
        // The play() method returns a Promise
        await video.play()
        setIsPlaying(true)
      }
    } catch (error) {
      // Handle any errors that might occur during playback
      console.error("Playback error:", error)
      // If there was an error playing, make sure UI state is consistent
      setIsPlaying(false)
    }
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const wasPlaying = !video.paused
    if (wasPlaying) {
      video.pause()
    }

    video.currentTime = value[0]
    setCurrentTime(value[0])

    if (wasPlaying) {
      video.play().catch((error) => {
        console.error("Error resuming playback:", error)
        setIsPlaying(false)
      })
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)

    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume || 1
      video.muted = false
    } else {
      video.muted = true
    }

    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    const videoContainer = document.querySelector(".video-container")
    if (!videoContainer) return

    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }

    setIsFullscreen(!isFullscreen)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const skipBackward = () => {
    const video = videoRef.current
    if (!video) return

    const wasPlaying = !video.paused
    if (wasPlaying) {
      video.pause()
    }

    video.currentTime = Math.max(0, video.currentTime - 10)

    if (wasPlaying) {
      video.play().catch((error) => {
        console.error("Error resuming playback:", error)
        setIsPlaying(false)
      })
    }
  }

  const skipForward = () => {
    const video = videoRef.current
    if (!video) return

    const wasPlaying = !video.paused
    if (wasPlaying) {
      video.pause()
    }

    video.currentTime = Math.min(video.duration, video.currentTime + 10)

    if (wasPlaying) {
      video.play().catch((error) => {
        console.error("Error resuming playback:", error)
        setIsPlaying(false)
      })
    }
  }

  return (
    <div className="video-container relative w-full h-full bg-black">
      <video ref={videoRef} className="w-full h-full" poster={thumbnailUrl} onClick={togglePlay}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play button overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
            <Play className="h-8 w-8" />
          </div>
        </div>
      )}

      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="mb-2"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={skipBackward}>
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={skipForward}>
              <SkipForward className="h-5 w-5" />
            </Button>

            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 w-24">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-16"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

