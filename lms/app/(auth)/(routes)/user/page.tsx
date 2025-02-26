"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";

import { CoursesList } from "@/components/courses-list";
import { InfoCard } from "./_components/info-card";

import { getDashboardCourses, CourseWithProgressWithCategory } from "@/actions";
import { useUser } from "@/hooks";

export default function Page() {
  const { user } = useUser();
  const [completedCourses, setCompletedCourses] = useState<
    CourseWithProgressWithCategory[]
  >([]);
  const [coursesInProgress, setCoursesInProgress] = useState<
    CourseWithProgressWithCategory[]
  >([]);

  useEffect(() => {
    if (user) {
      (async () => {
        const { completedCourses, coursesInProgress } =
          await getDashboardCourses();
        setCompletedCourses(completedCourses);
        setCoursesInProgress(coursesInProgress);
      })();
    }
  }, [user]);
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
        />
      </div>
      <CoursesList items={[...completedCourses, ...coursesInProgress]} />
    </div>
  );
}
