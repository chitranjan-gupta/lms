"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Lecture, Chapter } from "@prisma/client";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapter: Chapter & { lectures: Lecture[] };
  chapterId: string;
  lectureId: string;
  nextChapterId?: string;
  nextLectureId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapter,
  chapterId,
  lectureId,
  nextChapterId,
  nextLectureId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    // try {
    //   if (completeOnEnd) {
    //     await axios.put(
    //       `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/chapters/${chapterId}/lectures/${lectureId}/progress`,
    //       {
    //         isCompleted: true,
    //       },
    //       {
    //         withCredentials: true,
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //   }
    //   if (!nextChapterId && !nextLectureId) {
    //     confetti.onOpen();
    //   }
    //   toast.success("Progress updated");
    //   router.refresh();
    //   if (nextChapterId || nextLectureId) {
    //     const current = chapter.lectures.some(({ id }) => id === nextLectureId);
    //     if (current) {
    //       router.push(
    //         `/courses/${courseId}/chapters/${chapterId}/lectures/${lectureId}`
    //       );
    //     } else {
    //       router.push(
    //         `/courses/${courseId}/chapters/${nextChapterId}/lectures/${nextLectureId}`
    //       );
    //     }
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong");
    // }
  };
  return (
    <div className="relative aspect-videos">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};
