"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.startsWith("/courses");
  const isAdminPage = pathname?.startsWith("/admin");
  const isSearchPage = pathname === "/search";
  const { userId, role, logOut, apply } = useAuth();
  return (
    <>
      <div className="font-bold text-3xl mr-2">
        ShikshaSetu {isAdminPage && "Admin"} {isTeacherPage && "Teacher"}
      </div>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isAdminPage ? (
          <div className="flex flex-row items-center">
            <Link href="/dashboard">
              <Button size="sm" variant="ghost">
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {!isAdminPage &&
              !isTeacherPage &&
              !isCoursePage &&
              role !== "admin" &&
              role !== "subadmin" && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="mr-2"
                  onClick={apply}
                >
                  Apply for Teacher
                </Button>
              )}
            {isCoursePage && (
              <div className="mr-2">
                <Link href="/courses">Courses</Link>
              </div>
            )}
          </>
        )}
      </div>
      {userId ? (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/${isAdminPage ? "admin" : "dashboard"}`)
                }
              >
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
