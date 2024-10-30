"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputForm } from "./input-form";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { Company } from "@prisma/client";
import { form_attrs, formSchema } from "./form-type";

interface CompanyFormProps {
  initialData: Company;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const CompanyForm = ({ initialData, setRefresh }: CompanyFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/${initialData.id}`,
        values,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Company updated");
      setRefresh((prev) => !prev);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex flex-row flex-wrap gap-x-5 gap-y-5">
      {form_attrs.map((form_attr) => (
        <InputForm
          key={form_attr}
          form_attr={form_attr}
          form={form}
          initialData={initialData}
          onSubmit={onSubmit}
          isValid={isValid}
          isSubmitting={isSubmitting}
        />
      ))}
    </div>
  );
};
