import { db } from "@/lib/db";

export default async function GET(){
    const categories = await db.category.findMany({
        orderBy: {
          name: "asc",
        },
      });

    return categories
}