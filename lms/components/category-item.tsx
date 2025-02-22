"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategoryItem = ({
  label,
  value,
  icon: Icon,
}: CategoryItemProps) => {
  const currentCategoryId = "";
  const isSelected = currentCategoryId === value;
  const onClick = () => {
    
  };
  return (
    <div>
      <button
        onClick={onClick}
        className={cn(
          "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
          isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
        )}
        type="button"
      >
        {Icon && <Icon size={20} />}
        <div className="truncate">{label}</div>
      </button>
    </div>
  );
};
