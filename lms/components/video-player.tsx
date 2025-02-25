"use client";

import { useState, memo, useCallback, type FC } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib";
import { useConfettiStore } from "@/hooks";

import type { Lecture, Chapter } from "@/types";
import { setCourseProgress } from "@/api";

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

const VideoPlayerComponent: FC<VideoPlayerProps> = ({
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
}) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = useCallback(async () => {
    try {
      if (completeOnEnd) {
        await setCourseProgress(courseId, chapterId, lectureId, true);
      }
      if (!nextChapterId && !nextLectureId) {
        confetti.onOpen();
      }
      toast.success("Progress updated");
      router.refresh();
      if (nextChapterId || nextLectureId) {
        const current = chapter.lectures.some(({ id }) => id === nextLectureId);
        if (current) {
          router.push(
            `/courses/${courseId}/chapters/${chapterId}/lectures/${lectureId}`
          );
        } else {
          router.push(
            `/courses/${courseId}/chapters/${nextChapterId}/lectures/${nextLectureId}`
          );
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    chapter.lectures,
    chapterId,
    completeOnEnd,
    confetti,
    courseId,
    lectureId,
    nextChapterId,
    nextLectureId,
    router,
  ]);

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

export const VideoPlayer = memo(VideoPlayerComponent);
