"use client";

import React, {
  FormEvent,
  Fragment,
  useEffect,
  useState,
  Suspense,
} from "react";
import { Book, BookOpen, ArrowLeft } from "lucide-react";
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
import Loader from "@/components/loader";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const { userId } = useAuth();
  const [course, setCourse] = useState<
    Course & { chapters: (Chapter & { lectures: Lecture[] })[] }
  >();
  const [loading, setLoading] = useState<boolean>(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const getPurchase = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/purchases`,
        JSON.stringify({
          userId: userId,
          courseId: params.courseId,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        if (res.data) {
          if (res.data.courseId) {
            if (res.data.courseId == params.courseId) {
              setIsPurchased(true);
            }
          }
        }
      }
    } catch (error: any) {
      setIsPurchased(false);
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  const getCourse = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${params.courseId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        setCourse(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    } finally {
      setLoading(false);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${params.courseId}/checkout`,
        null,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.assign(response.data.url);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    void getCourse();
  }, [params.courseId]);

  useEffect(() => {
    if (userId) {
      void getPurchase();
    }
  }, [userId]);

  if (!course) {
    return <Loader />;
  }
  return (
    <Suspense fallback={<Loader />}>
      {loading ? (
        <Loader />
      ) : (
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
                {isPurchased ? (
                  <Link
                    href={`/courses/${course.id}/chapters/${course.chapters[0].id}/lectures/${course.chapters[0].lectures[0].id}`}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  >
                    View
                  </Link>
                ) : (
                  <form className="mt-10" onSubmit={onSubmit}>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    >
                      Buy
                    </button>
                  </form>
                )}
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    {course.description && (
                      <Preview value={course.description} />
                    )}
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
                            <AccordionTrigger>
                              <span className="flex flex-row gap-x-1">
                                <Book />
                                {chapter.title}
                              </span>
                            </AccordionTrigger>
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
                                    <li className="flex flex-row justify-between items-center">
                                      <span className="flex flex-row gap-x-3">
                                        <BookOpen />
                                        {lecture.title}
                                      </span>
                                      <span>{lecture.duration} min</span>
                                    </li>
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
      )}
    </Suspense>
  );
};

export default CourseIdPage;
