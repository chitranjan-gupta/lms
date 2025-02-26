"use client";

import { useCallback, type FC } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { CourseCreate } from "@/components/course-create";

import { courseTitleSchema } from "@/schema";
import { addCourse } from "@/api";
import { useUser } from "@/hooks";

const CreatePage: FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const form = useForm<z.infer<typeof courseTitleSchema>>({
    resolver: zodResolver(courseTitleSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(async (values: z.infer<typeof courseTitleSchema>) => {
    try {
      if (user) {
        const data = await addCourse(values);
        if (data) {
          router.push(`/teacher/courses/${data.id}`);
          toast.success("Course created");
        }
      }
    } catch (error: any) {
      toast.error("Something went wrong");
      if (error.response) {
        console.log(error.response);
      }
    }
  }, [router, user]);

  return (
    <CourseCreate
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      isValid={isValid}
      path="/teacher/courses"
    />
  );
};

export default CreatePage;
