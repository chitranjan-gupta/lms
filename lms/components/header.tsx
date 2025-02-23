"use client";

import { memo, useEffect, useState, type FC, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { AlignRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

import type { Navigation } from "@/types";

interface Auth {
  name: string;
  href: string;
}

const AuthComponent: FC<Auth> = ({ name, href }) => {
  return (
    <Link
      href={href}
      className="text-sm font-semibold leading-6 text-gray-900"
      prefetch={false}
    >
      {name}{" "}
      {name.toLowerCase().includes("sign") && (
        <span aria-hidden="true">&rarr;</span>
      )}
    </Link>
  );
};

const Auth = memo(AuthComponent);

interface NavigationProps {
  navigation: Navigation[];
}

const NavigationComponent: FC<NavigationProps> = ({ navigation }) => {
  return (
    <>
      {navigation.map((item) => (
        <Auth key={item.name} href={item.href} name={item.name} />
      ))}
    </>
  );
};

const Navigation = memo(NavigationComponent);

interface HeaderProps {
  navigation: Navigation[];
  logo: StaticImageData;
  children?: ReactNode;
}

const HeaderComponent: FC<HeaderProps> = ({ navigation, logo, children }) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) {
        setIsScrolling(false);
      } else {
        setIsScrolling(true);
      }
    });
  }, [setIsScrolling]);
  return (
    <header
      className={`fixed w-full h-[80px] inset-x-0 top-0 z-50  ${
        children ? "shadow-sm bg-white" : ""
      } ${isScrolling ? "shadow-sm bg-white" : ""}`}
    >
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5 relative flex flex-row items-center"
            prefetch={false}
          >
            <div className="relative h-10 w-10">
              <Image src={logo} alt="logo" fill />
            </div>
            <span className="text-4xl">ShikshaSetu</span>
          </Link>
        </div>
        {children ? (
          children
        ) : (
          <>
            <div className="flex lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <span className="sr-only">Open main menu</span>
                    <AlignRight size={24} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Paths</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {navigation.map((item) => (
                      <DropdownMenuItem key={item.name}>
                        <Auth name={item.name} href={item.href} />
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Auth name="Sign In" href="/sign-in" />
                      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Auth name="Sign Up" href="/sign-up" />
                      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              <Navigation navigation={navigation} />
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Auth name="Sign In" href="/sign-in" />
            </div>
            <div className="hidden ml-5 lg:flex lg:justify-end">
              <Auth name="Sign Up" href="/sign-up" />
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export const Header = memo(HeaderComponent);
