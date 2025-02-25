"use client";

import {
  type FormEvent,
  useState,
  Suspense,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {Loader} from "@/components/loader";
import { Course } from "@/components/course";

import { useCourse } from "@/core";

import { checkOut } from "@/api";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const router = useRouter();
  const { course, isPurchased,  } = useCourse();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const data:any = await checkOut(params.courseId)
      if(data){
        window.location.assign(data.url);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status == 401) {
          router.push("/sign-in");
        }
        console.log(error.response);
      }
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [params.courseId, router]);

  return (
    <Suspense fallback={<Loader />}>
      {course && <Course course={course} isLoading={isLoading} isPurchased={isPurchased} onSubmit={onSubmit} />}
    </Suspense>
  );
};

export default CourseIdPage;
