"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  SearchPage,
} from "@/components/courses-view";
import {
  laravel,
  reactjs,
  mysql,
  nextjs,
  nodejs,
  prisma,
  tailwindcss,
  logo,
  facebook,
  discord,
  twitter,
} from "@/assets";
import { useCategories, useCourses } from "@/core";
import { navigation } from "@/constants";
import { Header } from "@/components/header";

import type { CourseWithProgressWithCategory } from "@/types";

export default function Page() {
  const { categories, getCategories } = useCategories();
  const { courses, getCourses } = useCourses();
  // useEffect(() => {
  //   (async() => {
  //     await getCategories({ pageIndex: 1, pageSize: 10 });
  //     await getCourses({ pageIndex: 1, pageSize: 10 });
  //   })()
  // }, [getCategories, getCourses]);

  return (
    <div className="bg-white">
      <Header navigation={navigation} logo={logo} />

      <div className="my-16 w-full h-svh">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Improve Your Online Learning Experience Better
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              We have 20k+ online courses, 1k+ online registered teachers &
              500K+ online registered students. Find you desired courses now.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none hidden lg:block lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <Image
                          src={reactjs}
                          alt="reactjs"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={laravel}
                          alt="laravel"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={tailwindcss}
                          alt="tailwindcss"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={nextjs}
                          alt="nextjs"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={nodejs}
                          alt="nodejs"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={prisma}
                          alt="prisma"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={mysql}
                          alt="mysql"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                prefetch={false}
                href="/courses"
                className="inline-block rounded-md border border-transparent bg-sky-600 px-8 py-3 text-center font-medium text-white hover:bg-sky-600"
              >
                Find Course
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <h2 className="text-center text-4xl font-extrabold text-gray-900">
            Courses
          </h2>
        </div>
        <SearchPage
          categories={categories}
          courses={courses as unknown as CourseWithProgressWithCategory[]}
        />
      </div>

      <div>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
              Testimonials
            </h2>
          </div>
          <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
              <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Speechless with how easy
                </h3>
                <p className="my-4">
                  As someone who values flexibility and convenience in my
                  learning journey, this LMS has been a game-changer for me. The
                  variety of courses available and the user-friendly interface
                  make it easy for me to explore new topics and skills at my own
                  pace. The interactive features keep me engaged, and I
                  appreciate being able to access the content whenever and
                  wherever I want.
                </p>
              </blockquote>
              <figcaption className="flex justify-center items-center space-x-3">
                <div className="relative w-9 h-9">
                  <Image
                    className="rounded-full"
                    fill
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="profile picture"
                  />
                </div>
                <div className="space-y-0.5 font-medium dark:text-white text-left">
                  <div>Bonnie Green</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Developer at Open AI
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
              <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Solid foundation for any project
                </h3>
                <p className="my-4">
                  This LMS is a lifesaver for someone like me who&apos;s
                  constantly on the go. The bite-sized lessons and mobile
                  compatibility make it easy for me to squeeze in learning
                  between work and family commitments. I love that I can pick up
                  right where I left off, and the clear, concise content keeps
                  me focused even with a busy schedule.
                </p>
              </blockquote>
              <figcaption className="flex justify-center items-center space-x-3">
                <div className="relative w-9 h-9">
                  <Image
                    className="rounded-full"
                    fill
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                    alt="profile picture"
                  />
                </div>
                <div className="space-y-0.5 font-medium dark:text-white text-left">
                  <div>Roberta Casas</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Lead designer at Dropbox
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 lg:border-b-0 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
              <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Mindblowing courses
                </h3>
                <p className="my-4">
                  I cant&apos;t recommend this LMS enough for recent graduates
                  like myself who are eager to jumpstart their careers. The
                  courses offered are highly relevant to my field of interest,
                  and the resources available for professional development, such
                  as resume building and job search assistance, have been
                  invaluable.
                </p>
                <p className="my-4">
                  The platform also provides opportunities for networking and
                  mentorship, which have been crucial for me as I navigate the
                  job market.
                </p>
              </blockquote>
              <figcaption className="flex justify-center items-center space-x-3">
                <div className="relative w-9 h-9">
                  <Image
                    className="rounded-full"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    fill
                    alt="profile picture"
                  />
                </div>
                <div className="space-y-0.5 font-medium dark:text-white text-left">
                  <div>Jese Leos</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Software Engineer at Facebook
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
              <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Robust system
                </h3>
                <p className="my-4">
                  As a CTO, I need an LMS that can scale with the needs of my
                  organization and provide robust tracking and reporting
                  features. This LMS delivers on all fronts. The customizable
                  content allows me to align training with company objectives,
                  and the integration with our existing HR systems streamlines
                  the process. The security measures in place give me peace of
                  mind, and the detailed analytics help me monitor employee
                  progress and measure the impact of our training programs.
                </p>
              </blockquote>
              <figcaption className="flex justify-center items-center space-x-3">
                <div className="relative w-9 h-9">
                  <Image
                    className="rounded-full"
                    fill
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="profile picture"
                  />
                </div>
                <div className="space-y-0.5 font-medium dark:text-white text-left">
                  <div>Joseph McFall</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    CTO at Reform
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <section id="fyq">
        <div className="py-16 flex flex-col justify-center items-center">
          <div className="mb-5">
            <h3 className="text-4xl font-extrabold text-gray-900">
              Common FAQ
            </h3>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-[400px]">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Will I receive a certificate for each course?
                </AccordionTrigger>
                <AccordionContent>
                  Yes — each student who completes any course will receive a
                  certificate of completion to acknowledge their proficiency. We
                  encourage students to include these on their LinkedIn profiles
                  and in their job applications!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I get the source code of each course?
                </AccordionTrigger>
                <AccordionContent>
                  Yes - You will get source code of all courses when you will
                  watch the course video.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Can I ask about anything related course or if my code
                  doesn&apos;t work?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can comment on every part of the videos in the
                  course. We&apos;ll always try to reply to your comment and fix
                  any issues you may have.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Can I download any course video?
                </AccordionTrigger>
                <AccordionContent>
                  For security reasons, course videos cannot be downloaded.
                  However, you have lifetime access to each purchased course and
                  can watch them anytime, anywhere with your account
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <footer className="bg-white ">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                <div className="relative h-10 w-10">
                  <Image src={logo} className="" fill alt="Logo" />
                </div>
                <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                  ShikshaSetu
                </span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                  Follow us
                </h2>
                <ul className="text-gray-500  font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline ">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                  Legal
                </h2>
                <ul className="text-gray-500  font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center ">
              © 2025{" "}
              <a href="#" className="hover:underline">
                Chitranjan Gupta
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-900 ">
                <Image src={facebook} className="w-4 h-4" alt="facebook" />
                <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 ms-5">
                <Image src={discord} className="w-4 h-4" alt="discord" />
                <span className="sr-only">Discord community</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900  ms-5">
                <Image src={twitter} className="w-4 h-4" alt="twitter" />
                <span className="sr-only">Twitter page</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
