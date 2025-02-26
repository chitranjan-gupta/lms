"use client";

import { useEffect, type FC, type ReactNode } from "react";

import { useCategories } from "@/core";

interface CoursesProps {
  children: ReactNode;
}

const CoursesLayout: FC<CoursesProps> = ({ children }) => {
  const { getCategories } = useCategories();
  useEffect(() => {
    (async () => {
      await getCategories({ pageIndex: 1, pageSize: 10 });
    })();
  }, [getCategories]);

  return <>{children}</>;
};

export default CoursesLayout;
