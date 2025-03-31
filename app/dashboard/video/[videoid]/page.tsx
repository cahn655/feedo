import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import VideoPageClient from "@/app/dashboard/video/[videoid]/video-page-client"


export default async function VideoPage({ params }: { params: { videoid: string } }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/signin");
  }

  return <VideoPageClient videoId={params.videoid} />
}

