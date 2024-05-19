"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Chapter, Lecture } from "@prisma/client";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

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

export const CourseProgressButton = ({
  chapter,
  chapterId,
  courseId,
  lectureId,
  isCompleted,
  isChapterCompleted,
  nextChapterId,
  nextLectureId,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/lectures/${lectureId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );
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
            await axios.put(
              `/api/courses/${courseId}/chapters/${chapterId}/progress`,
              {
                isCompleted: true,
              }
            );
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
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};
