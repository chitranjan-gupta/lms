"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputForm } from "./input-form";
import { Dispatch, SetStateAction, Fragment } from "react";
import toast from "react-hot-toast";
import { Career } from "@/types";
import { form_attrs, formSchema } from "./form-type";
import { BenefitsForm } from "./benefits-form";
import { RequirementsForm } from "./requirements-form";
import { ResponsibilitiesForm } from "./responsibilities-form";
import { SkillsForm } from "./skills-form";

interface CareerFormProps {
  initialData: Career;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const CareerForm = ({ initialData, setRefresh }: CareerFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/${initialData.companyId}/careers/${initialData.id}`,
        values,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Career updated");
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
      {form_attrs.map((form_attr) =>
        form_attr === "responsibilities" ||
        form_attr === "benefits" ||
        form_attr === "requirements" ||
        form_attr === "skills" ? (
          <Fragment key={`${form_attr}.${form_attr}`}>
            {form_attr === "responsibilities" && (
              <ResponsibilitiesForm
                key={form_attr}
                form_attr={form_attr}
                form={form}
                initialData={initialData}
                onSubmit={onSubmit}
                isValid={isValid}
                isSubmitting={isSubmitting}
              />
            )}
            {form_attr === "benefits" && (
              <BenefitsForm
                key={form_attr}
                form_attr={form_attr}
                form={form}
                initialData={initialData}
                onSubmit={onSubmit}
                isValid={isValid}
                isSubmitting={isSubmitting}
              />
            )}
            {form_attr === "requirements" && (
              <RequirementsForm
                key={form_attr}
                form_attr={form_attr}
                form={form}
                initialData={initialData}
                onSubmit={onSubmit}
                isValid={isValid}
                isSubmitting={isSubmitting}
              />
            )}
            {form_attr === "skills" && (
              <SkillsForm
                key={form_attr}
                form_attr={form_attr}
                form={form}
                initialData={initialData}
                onSubmit={onSubmit}
                isValid={isValid}
                isSubmitting={isSubmitting}
              />
            )}
          </Fragment>
        ) : (
          <InputForm
            key={form_attr}
            form_attr={form_attr}
            form={form}
            initialData={initialData}
            onSubmit={onSubmit}
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        )
      )}
    </div>
  );
};
