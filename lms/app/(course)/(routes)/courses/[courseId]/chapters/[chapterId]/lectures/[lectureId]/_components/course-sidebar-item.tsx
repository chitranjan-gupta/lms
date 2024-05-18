"use client";

import { cn } from "@/lib/utils";
import { Lecture } from "@prisma/client";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  chapterId: string;
  purchase: boolean;
}

interface CouseSidebarDropDownItemsProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  lectures?: Lecture[];
  purchase: boolean;
}

export const CourseSidebarDropDownItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
  lectures,
  purchase,
}: CouseSidebarDropDownItemsProps) => {
  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  return (
    <AccordionItem value={id}>
      <AccordionTrigger disabled={isLocked} className="p-2">
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn("text-slate-500", isCompleted && "text-emerald-700")}
          />
          {label}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {lectures?.map((lecture) => (
          <CourseSidebarItem
            key={lecture.id}
            id={lecture.id}
            label={lecture.title}
            isCompleted={false}
            isLocked={!lecture.isFree && !purchase}
            courseId={lecture.courseId}
            chapterId={id}
            purchase={purchase}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
  chapterId,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);
  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${chapterId}/lectures/${id}`);
  };
  return (
    <>
      <button
        disabled={isLocked}
        onClick={onClick}
        type="button"
        className={cn(
          "w-full h-14 flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
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
        <div
          className={cn(
            "ml-auto opacity-0 border-2 border-slate-700 h-14 transition-all",
            isActive && "opacity-100",
            isCompleted && "text-emerald-700"
          )}
        />
      </button>
    </>
  );
};
