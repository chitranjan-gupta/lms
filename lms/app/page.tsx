import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import reactlogo from "@/public/react-logo.svg";
import laravellogo from "@/public/laravel-logo.svg";
import mysqllogo from "@/public/mysql-logo.svg";
import nextjslogo from "@/public/next-js-logo.svg";
import nodejslogo from "@/public/nodejs-logo.svg";
import prismalogo from "@/public/prisma-logo.svg";
import tailwindcsslogo from "@/public/tailwindcss-logo.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SearchPage } from "./_components/courses-view";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "#" },
  { name: "Policy", href: "#" },
  { name: "FAQ", href: "#fyq" },
];

export default function Page() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 relative" prefetch={false}>
              <span className="sr-only">LMS</span>
              <div className="relative h-10 w-28">
                <Image src={logo} alt="logo" fill />
              </div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
                prefetch={false}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/sign-in"
              className="text-sm font-semibold leading-6 text-gray-900"
              prefetch={false}
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="hidden ml-5 lg:flex lg:justify-end">
            <Link
              href="/sign-up"
              className="text-sm font-semibold leading-6 text-gray-900"
              prefetch={false}
            >
              Sign up <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="my-10 lg:my-16 w-full h-svh">
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
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <Image
                          src={reactlogo}
                          alt="react"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={laravellogo}
                          alt="laravel"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={tailwindcsslogo}
                          alt="tailwindcss"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={nextjslogo}
                          alt="nextjs"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={nodejslogo}
                          alt="nodejs"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={prismalogo}
                          alt="prisma"
                          fill
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src={mysqllogo}
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
        <SearchPage />
      </div>

      <div className="w-full ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="mx-auto mt-10 flex justify-between items-center">
            <div className="relative max-h-12 w-[158px] h-[48px]">
              <Image
                className="object-contain"
                fill
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                alt="Transistor"
              />
            </div>
            <div className="relative max-h-12 w-[158px] h-[48px]">
              <Image
                className="object-contain"
                fill
                src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                alt="Reform"
              />
            </div>
            <div className="relative max-h-12 w-[158px] h-[48px]">
              <Image
                className="object-contain"
                fill
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                alt="SavvyCal"
              />
            </div>
            <div className="relative max-h-12 w-[158px] h-[48px]">
              <Image
                className="object-contain"
                fill
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
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
      <section id="#fyq">
        <div className="py-16 flex flex-col justify-center items-center">
          <div className="mb-5">
            <h3 className="text-4xl font-extrabold text-gray-900">
              Common FAQ
            </h3>
          </div>
          <div>
            <Accordion type="single" collapsible>
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
                <div className="relative h-28 w-28">
                  <Image src={logo} className="" fill alt="Logo" />
                </div>
                <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                  LMS
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
                      Github
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Discord
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
              © 2024{" "}
              <a href="#" className="hover:underline">
                Chitranjan Gupta
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-900 ">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900  ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900  ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900  ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
