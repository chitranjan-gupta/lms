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
import { Company } from "@/types";
import { CompanyFormFields, formSchema } from "./form-type";
import { z } from "zod";

interface InputFormProps {
  initialData: Company;
  form_attr: keyof CompanyFormFields;
  form: any;
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
        Company {form_attr.replaceAll("_", " ")}
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit {form_attr.replaceAll("_", " ")}
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{String(initialData[form_attr])}</p>}
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
                      type={form_attr === "contact_no" ? "tel" : "text"}
                      disabled={isSubmitting}
                      placeholder={`Enter ${form_attr.replaceAll("_", " ")}`}
                      {...field}
                      value={field.value || ""}
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
