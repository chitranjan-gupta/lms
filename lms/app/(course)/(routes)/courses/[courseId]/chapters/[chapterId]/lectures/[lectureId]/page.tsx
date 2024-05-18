"use client";
import { getLecture } from "@/actions/get-lecture";
import { Banner } from "@/components/banner";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File, Lock } from "lucide-react";
import { CourseProgressButton } from "./_components/course-progress-button";
import { useAuth } from "@/context/AuthContext";
import {
  Chapter,
  ChapterAttachment,
  ChapterProgress,
  Course,
  Lecture,
  LectureAttachment,
  MuxData,
} from "@prisma/client";
import { useEffect, useState } from "react";

const LectureIdPage = ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
    lectureId: string;
  };
}) => {
  const { userId } = useAuth();
  const [lecture, setLecture] = useState<Lecture>();
  const [chapter, setChapter] = useState<Chapter>();
  const [course, setCourse] = useState<Course>();
  const [muxData, setMuxData] = useState<MuxData>();
  const [attachments, setAttachments] = useState<LectureAttachment[]>([]);
  const [chapterAttachments, setChapterAttachments] = useState<
    ChapterAttachment[]
  >([]);
  const [nextChapter, setNextChapter] = useState<Chapter>();
  const [userProgress, setUserProgress] = useState<ChapterProgress>();
  const [purchase, setPurchase] = useState();

  useEffect(() => {
    getLecture({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
      lectureId: params.lectureId,
    }).then((value) => {
      setCourse(value.course);
      setChapter(value.chapter);
      setLecture(value.lecture);
      setMuxData(value.muxData);
      setAttachments(value.attachments);
      setChapterAttachments(value.chapterAttachments);
      setNextChapter(value.nextChapter);
      setUserProgress(value.userProgress);
      setPurchase(value.purchase);
    });
  }, [userId]);

  if (!chapter || !course || !lecture) {
    return <div>No lecture</div>;
  }

  const isLocked = !lecture.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  return (
    <div>
      {!purchase && (
        <Banner variant="success" label="This is free for watching" />
      )}
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="success"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-2">
        <div className="p-4">
          {muxData?.playbackId && (
            <VideoPlayer
              chapterId={params.chapterId}
              title={chapter.title}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              playbackId={muxData?.playbackId!}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd}
            />
          )}
          {(!muxData?.playbackId || isLocked) && (
            <div className="w-full h-96 flex flex-row justify-center items-center bg-slate-300">
              {isLocked ? <Lock className="w-10 h-10"/> : <></>}
            </div>
          )}
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{lecture.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={lecture.description!} />
          </div>
          {purchase && !!attachments.length && (
            <>
              <Separator />{" "}
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    key={attachment.id}
                    target="_blank"
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File className="" />
                    <p>{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
          {purchase && !!chapterAttachments.length && (
            <>
              <Separator />{" "}
              <div className="p-4">
                {chapterAttachments.map((chapterAttachment) => (
                  <a
                    href={chapterAttachment.url}
                    key={chapterAttachment.id}
                    target="_blank"
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File className="" />
                    <p>{chapterAttachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LectureIdPage;
