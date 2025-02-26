"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Career } from "@/types";
import { CareerFormField, formSchema, InputType } from "./form-type";
import { ValueForm } from "./value-form";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

interface InputFormProps {
  initialData: Career;
  form_attr: CareerFormField;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  isValid: boolean;
  isSubmitting: boolean;
}

export const InputForm = ({
  initialData,
  form_attr,
  form,
  onSubmit,
  isValid,
  isSubmitting,
}: InputFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  return (
    <div
      key={form_attr}
      className="border bg-slate-100 rounded-md p-4 w-full md:w-[48%]"
    >
      <div className="font-medium flex items-center justify-between">
        Career {form_attr.replaceAll("_", " ")}
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit{" "}
              {form_attr.replaceAll("_", " ")}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="text-sm mt-2">
          <ValueForm value={initialData[form_attr]} />
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name={form_attr}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={InputType(form_attr)}
                      disabled={isSubmitting}
                      placeholder={`Enter ${form_attr.replaceAll("_", " ")}`}
                      {...field}
                      value={field.value?.toLocaleString() || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
