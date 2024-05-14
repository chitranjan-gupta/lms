import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";
import { Category, Course } from "@prisma/client";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {  
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      title: {
        contains: searchParams.title,
      },
      categoryId: searchParams.categoryId
    },
    include: {
      category: true,
      chapters: {
        where: {
          isPublished: true,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  }) as unknown as CourseWithProgressWithCategory[];

  return (
    <>
      <div className="px-6 pt-6 block md:mb-0">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
