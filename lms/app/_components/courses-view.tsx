import { db } from "@/lib/db";
import { Categories } from "./categories";
import { CoursesList } from "@/components/courses-list";
import { Category, Course } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

export const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = (await db.course.findMany({
    where: {
      isPublished: true,
    },
    include: {
      category: true,
      chapters: {
        where: {
          isPublished: true,
        },
        select: {
          id: true,
          lectures: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })) as unknown as CourseWithProgressWithCategory[];

  return (
    <>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};
