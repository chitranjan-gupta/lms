"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const Actions = ({
  disabled,
  courseId,
  isPublished,
  setRefresh,
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();
  const onClick = async () => {
    try {
      setIsLoading(false);
      if (isPublished) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/unpublish`,
          null,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Course unpublished");
      } else {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/publish`,
          null,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Course Published");
        confetti.onOpen();
      }
      setRefresh((prev) => !prev);
      // router.refresh();
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Course deleted");
      setRefresh((prev) => !prev);
      //router.refresh();
      router.push(`/teacher/courses`);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
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
