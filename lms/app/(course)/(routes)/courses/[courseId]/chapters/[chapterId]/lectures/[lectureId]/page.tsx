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
  LectureProgress,
  MuxData,
} from "@prisma/client";
import React, { useEffect, useState, Suspense } from "react";
import Loader from "@/components/loader";

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
  const [chapter, setChapter] = useState<Chapter & { lectures: Lecture[] }>();
  const [course, setCourse] = useState<Course>();
  const [muxData, setMuxData] = useState<MuxData>();
  const [lectureAttachments, setLectureAttachments] = useState<
    LectureAttachment[]
  >([]);
  const [chapterAttachments, setChapterAttachments] = useState<
    ChapterAttachment[]
  >([]);
  const [nextChapter, setNextChapter] = useState<Chapter>();
  const [nextLecture, setNextLecture] = useState<Lecture>();
  const [chapterProgress, setChapterProgress] = useState<ChapterProgress>();
  const [lectureProgress, setLectureProgress] = useState<LectureProgress>();
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
      setLectureAttachments(value.lectureAttachments);
      setChapterAttachments(value.chapterAttachments);
      setNextChapter(value.nextChapter);
      setNextLecture(value.nextLecture);
      setChapterProgress(value.chapterProgress);
      setLectureProgress(value.lectureProgress);
      setPurchase(value.purchase);
    });
  }, [userId]);

  if (!chapter || !course || !lecture) {
    return <Loader />;
  }

  const isLocked = !lecture.isFree && !purchase;
  const completeOnEnd = !!purchase && !lectureProgress?.isCompleted;
  return (
    <Suspense fallback={<Loader />}>
      
      <div>
        {!purchase && lecture.isFree && (
          <Banner variant="success" label="This is free for watching" />
        )}
        {chapterProgress?.isCompleted && (
          <Banner
            variant="success"
            label="You already completed this chapter."
          />
        )}
        {lectureProgress?.isCompleted && (
          <Banner
            variant="success"
            label="You already completed this lecture."
          />
        )}
        {isLocked && (
          <Banner
            variant="success"
            label="You need to purchase this course to watch this lecture."
          />
        )}
        <div className="flex flex-col max-w-4xl mx-auto pb-2">
          <div className="p-4">
            {muxData?.playbackId && (
              <VideoPlayer
                title={chapter.title}
                chapter={chapter}
                chapterId={params.chapterId}
                courseId={params.courseId}
                lectureId={params.lectureId}
                nextChapterId={nextChapter?.id}
                nextLectureId={nextLecture?.id}
                playbackId={muxData?.playbackId!}
                isLocked={isLocked}
                completeOnEnd={completeOnEnd}
              />
            )}
            {(!muxData?.playbackId || isLocked) && (
              <div className="w-full h-96 flex flex-row justify-center items-center bg-slate-300">
                {isLocked ? <Lock className="w-10 h-10" /> : <></>}
              </div>
            )}
          </div>
          <div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">{lecture.title}</h2>
              {purchase ? (
                <CourseProgressButton
                  chapter={chapter}
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  lectureId={params.lectureId}
                  nextChapterId={nextChapter?.id}
                  nextLectureId={nextLecture?.id}
                  isCompleted={!!lectureProgress?.isCompleted}
                  isChapterCompleted={!!chapterProgress?.isCompleted}
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
            {purchase && !!lectureAttachments.length && (
              <>
                <Separator />{" "}
                <div className="p-4">
                  {lectureAttachments.map((lectureAttachment) => (
                    <a
                      href={lectureAttachment.url}
                      key={lectureAttachment.id}
                      target="_blank"
                      className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                    >
                      <File className="" />
                      <p>{lectureAttachment.name}</p>
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
    </Suspense>
  );
};

export default LectureIdPage;
