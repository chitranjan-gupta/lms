"use client";
import React, { useEffect, useState } from "react";
import {
  getDashboardCourses,
  CourseWithProgressWithCategory,
} from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { userId } = useAuth();
  const [completedCourses, setCompletedCourses] = useState<
    CourseWithProgressWithCategory[]
  >([]);
  const [coursesInProgress, setCoursesInProgress] = useState<
    CourseWithProgressWithCategory[]
  >([]);

  useEffect(() => {
    if (userId) {
      getDashboardCourses(userId).then((value) => {
        setCompletedCourses(value.completedCourses);
        setCoursesInProgress(value.coursesInProgress);
      });
    }
  }, [userId]);
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
