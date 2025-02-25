"use client";

import { useState, memo, type FC } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";

import { Button } from "./ui/button";

import { useConfettiStore } from "@/hooks";
import { setChapterProgress, setCourseProgress } from "@/api";

import type { Chapter, Lecture } from "@/types";

interface CourseProgressButtonProps {
  chapter: Chapter & { lectures: Lecture[] };
  chapterId: string;
  courseId: string;
  lectureId: string;
  isCompleted?: boolean;
  isChapterCompleted?: boolean;
  nextChapterId?: string;
  nextLectureId?: string;
}

const CourseProgressButtonComponent: FC<CourseProgressButtonProps> = ({
  chapter,
  chapterId,
  courseId,
  lectureId,
  isCompleted,
  isChapterCompleted,
  nextChapterId,
  nextLectureId,
}) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      await setCourseProgress(courseId, chapterId, lectureId, !isCompleted)
      if (!isCompleted && !nextChapterId && !nextLectureId) {
        confetti.onOpen();
      }
      if (!isCompleted && (nextChapterId || nextLectureId)) {
        const current = chapter.lectures.some(({ id }) => id === nextLectureId);
        if (current) {
          router.push(
            `/courses/${courseId}/chapters/${chapterId}/lectures/${nextLectureId}`
          );
        } else {
          if (!isChapterCompleted) {
            await setChapterProgress(courseId, chapterId, true)
          }
          router.push(
            `/courses/${courseId}/chapters/${nextChapterId}/lectures/${nextLectureId}`
          );
        }
      }
      toast.success("Progress updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "destructive"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};

export const CourseProgressButton = memo(CourseProgressButtonComponent);