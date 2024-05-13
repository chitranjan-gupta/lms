"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"

const navigation = [
  { name: "Home", href: "#" },
  { name: "Courses", href: "#" },
  { name: "About", href: "#" },
  { name: "Policy", href: "#" },
  { name: "FAQ", href: "#" },
];

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="#" className="-m-1.5 p-1.5 relative" prefetch={false}>
              <span className="sr-only">LMS</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
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
        </nav>
      </header>

      <div className="pt-16 lg:pt-40">
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
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                          alt=""
                          fill
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                          alt=""
                          fill
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                          alt=""
                          fill
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                          alt=""
                          fill
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                          alt=""
                          fill
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                          alt=""
                          fill
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 relative overflow-hidden rounded-lg">
                        <Image
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                          alt=""
                          fill
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                prefetch={false}
                href="/search"
                className="inline-block rounded-md border border-transparent bg-sky-600 px-8 py-3 text-center font-medium text-white hover:bg-sky-600"
              >
                Find Course
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
