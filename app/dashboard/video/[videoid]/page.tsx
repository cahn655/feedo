import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VideoPageClient from "@/app/dashboard/video/[videoid]/video-page-client";

interface PageProps {
  params: {
    videoid: string;
  };
}

export default async function VideoPage({ params }: PageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/signin");
  }

  return <VideoPageClient videoId={params.videoid} />;
}
