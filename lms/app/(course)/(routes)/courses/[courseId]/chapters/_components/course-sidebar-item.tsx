"use client";

import { cn } from "@/lib/utils";
import { Lecture } from "@prisma/client";
import { CheckCircle, Lock, PlayCircle, ArrowDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  lectures?: Lecture[];
}

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
  lectures,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);
  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "w-full h-full flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
          isActive &&
            "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
          isCompleted && "text-emerald-700 hover:text-emerald-700",
          isCompleted && isActive && "bg-emerald-200/20"
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn(
              "text-slate-500",
              isActive && "text-slate-700",
              isCompleted && "text-emerald-700"
            )}
          />
          {label}
        </div>
            { lectures && <ArrowDown />}
        <div
          className={cn(
            "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
            isActive && "opacity-100",
            isCompleted && "text-emerald-700"
          )}
        />
      </button>
      {lectures && (
        <div className="pl-4 w-full h-full">
          {lectures?.map((lecture) => (
            <CourseSidebarItem
              key={lecture.id}
              id={lecture.id}
              label={lecture.title}
              isCompleted={false}
              isLocked={lecture.isFree}
              courseId={lecture.courseId}
            />
          ))}
        </div>
      )}
    </>
  );
};
