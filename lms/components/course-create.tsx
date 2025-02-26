"use client";

import { memo, type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { courseTitleSchema } from "@/schema";

interface CourseCreateProps {
  form: UseFormReturn<
    {
      title: string;
    },
    any,
    undefined
  >;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: z.infer<typeof courseTitleSchema>) => Promise<void>;
  isSubmitting: boolean;
  isValid: boolean;
  path: string;
}

const CourseCreateComponent: FC<CourseCreateProps> = ({
  form,
  onSubmit,
  isSubmitting,
  isValid,
  path,
}) => {
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Advanced web development"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href={path}>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export const CourseCreate = memo(CourseCreateComponent);
