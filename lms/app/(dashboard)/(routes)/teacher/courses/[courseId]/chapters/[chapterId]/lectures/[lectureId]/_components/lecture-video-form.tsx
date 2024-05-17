"use client";

import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Lecture, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import MuxPlayer from "@mux/mux-player-react";

interface LectureVideoFormProps {
  initialData: Lecture & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
  lectureId: string;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const LectureVideoForm = ({
  initialData,
  courseId,
  chapterId,
  lectureId,
  setRefresh,
}: LectureVideoFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}/lectures/${lectureId}`,
        values
      );
      toast.success("Lecture updated");
      toggleEdit();
      setRefresh((prev) => !prev);
      //router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Lecture Video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="lectureVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this lecture&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page video does
          not appear.
        </div>
      )}
    </div>
  );
};
