"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { SetStateAction, Dispatch,useState } from "react";
import toast from "react-hot-toast";

interface LectureActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  lectureId: string;
  isPublished: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>
}

export const LectureActions = ({
  disabled,
  courseId,
  chapterId,
  lectureId,
  isPublished,
  setRefresh
}: LectureActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(false);
      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/lectures/${lectureId}/unpublish`
        );
        toast.success("Lecture unpublished");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/lectures/${lectureId}/publish`
        );
        toast.success("Lecture Published");
      }
      setRefresh((prev) => !prev)
      // router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/lectures/${lectureId}`);
      toast.success("Lecture deleted");
      setRefresh(true);
      //router.refresh();
      router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
