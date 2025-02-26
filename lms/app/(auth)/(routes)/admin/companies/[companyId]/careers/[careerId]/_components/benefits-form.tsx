"use client";

import * as z from "zod";
import { useFieldArray } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Career } from "@/types";
import { CareerFormFields, formSchema } from "./form-type";
import { ValueForm } from "./value-form";
import { UseFormReturn } from "react-hook-form";

interface BenefitsFormProps {
  initialData: Career;
  form_attr: keyof CareerFormFields;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  isValid: boolean;
  isSubmitting: boolean;
}

export const BenefitsForm = ({
  initialData,
  form_attr,
  form,
  onSubmit,
  isValid,
  isSubmitting,
}: BenefitsFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "benefits" as never
  });

  return (
    <div
      key={form_attr}
      className="border bg-slate-100 rounded-md p-4 w-full md:w-[48%]"
    >
      <div className="font-medium flex items-center justify-between">
        Course {form_attr.replaceAll("_", " ")}
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit {form_attr.replaceAll("_", " ")}
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
            {fields.map((item, index) => (
              <FormField
                control={form.control}
                name={`benefits.${index}`}
                key={item.id}
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-row">
                        <Input
                          {...form.register(`benefits.${index}` as const)}
                          disabled={isSubmitting}
                          placeholder={`Enter ${form_attr.replaceAll(
                            "_",
                            " "
                          )}`}
                        />
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          variant="outline"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="flex items-center gap-x-2">
              <Button type="button" onClick={() => append("")}>
                Add Item
              </Button>
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
