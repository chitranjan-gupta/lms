"use client";

import { useState, memo, type FC } from "react";
import toast from "react-hot-toast";

import { Button } from "./ui/button";

import { formatPrice } from "@/lib";
import { checkOut } from "@/api";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

const CourseEnrollButtonComponent: FC<CourseEnrollButtonProps> = ({
  price,
  courseId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const data:any = await checkOut(courseId)
      if(data){
        window.location.assign(data.url);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export const CourseEnrollButton = memo(CourseEnrollButtonComponent)