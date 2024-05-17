"use client";
import React, { FormEvent, Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import { Preview } from "@/components/preview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Course, Chapter, Lecture } from "@prisma/client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const reviews = { href: "#", average: 4, totalCount: 117 };

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const { userId } = useAuth();
  const [course, setCourse] = useState<
    Course & { chapters: (Chapter & { lectures: Lecture[] })[] }
  >();
  const getCourse = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.courseId}`
      );
      if (res.status == 200) {
        setCourse(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${params.courseId}/checkout`);
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    void getCourse();
  }, [params.courseId]);

  if (!course) {
    return <div>Not Found</div>;
  }
  return (
    <div className="bg-white">
      <div className="">
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {course.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            {course.imageUrl && (
              <div className="relative w-auto h-60">
                <Image src={course.imageUrl} fill alt={course.title} />
              </div>
            )}
            {/* Price */}
            <div className="mt-6">
              <p className="text-3xl tracking-tight text-gray-900">
                {formatPrice(course.price!)}
              </p>
            </div>
            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center"></div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-sky-600 hover:text-sky-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10" onSubmit={onSubmit}>
              <button
                disabled={isLoading}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Buy
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                {course.description && <Preview value={course.description} />}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900">
                Course overview
              </h3>
              <div className="mt-4">
                <Accordion type="single" collapsible>
                  {course.chapters.map((chapter) => (
                    <Fragment key={chapter.id}>
                      <AccordionItem value={chapter.id}>
                        <AccordionTrigger>{chapter.title}</AccordionTrigger>
                        <AccordionContent>
                          <ul
                            role="list"
                            className="list-disc space-y-2 pl-4 text-sm"
                          >
                            {chapter.lectures.map((lecture) => (
                              <Link
                                key={lecture.id}
                                href={`/courses/${course.id}/chapters/${chapter.id}/lectures/${lecture.id}`}
                              >
                                <li>{lecture.title}</li>
                              </Link>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Fragment>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900">Details</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
