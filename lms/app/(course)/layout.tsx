import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50 p-4 border-b flex items-center bg-white shadow-sm">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 relative" prefetch={false}>
            <span className="sr-only">LMS</span>
            <div className="relative h-10 w-28">
              <Image src={logo} alt="logo" fill />
            </div>
          </Link>
        </div>
        <div className="flex">
          <Link href="/courses" prefetch={false}>Courses</Link>
        </div>
      </div>
      <main className="pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
