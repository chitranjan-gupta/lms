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
import { useAuth, useUser } from "@/hooks";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminPage = pathname?.startsWith("/admin");
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isUserPage = pathname?.startsWith("/user");
  const isCoursePage = pathname?.startsWith("/courses");
  const isSearchPage = pathname === "/search";
  const { user } = useUser();
  const { handleLogout } = useAuth();
  return (
    <>
      <div className="font-bold text-3xl mr-2">
        ShikshaSetu {isAdminPage && "Admin"} {isTeacherPage && "Teacher"} {isUserPage && "User"}
      </div>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isAdminPage || isUserPage ? (
          <div className="flex flex-row items-center">
            <Link href="/">
              <Button type="button" size="sm" variant="ghost">
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
              isUserPage &&
              user?.role !== "admin" &&
              user?.role !== "subadmin" &&
              user?.role === "user" && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="mr-2"
                  //onClick={apply}
                >
                  Apply for Teacher
                </Button>
              )}
          </>
        )}
      </div>
      {user?.userId ? (
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
                  router.push(`/${user?.role === "subadmin" ? "subadmin" : user?.role}`)
                }
              >
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
