import type { Company } from "@/types";

interface ValueFormProps {
  value: string | Date | string[] | undefined | Company;
}

export const ValueForm: React.FC<ValueFormProps> = ({ value }) => {
  if (value === undefined) {
    return <span>No data available</span>;
  }

  if (Array.isArray(value)) {
    return (
      <ul>
        {value.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === "string") {
    return <span>{value}</span>;
  }

  if (value instanceof Date) {
    return <span>{value.toLocaleDateString()}</span>; // Format the date as needed
  }

  return null; // Fallback
};