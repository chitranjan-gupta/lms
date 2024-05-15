import { redirect } from "next/navigation";

export default function Page() {
  const userId = "";
  if (!userId) {
    return redirect("/sign-up");
  }
  return redirect("/dashboard");
}
