import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Page() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-up");
  }
  return redirect("/dashboard");
}
