"use server";

import { db, postsColumn } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function newPost(text: string, hashtags: string[]) {
  await db.insert(postsColumn).values({
    text: text,
    hashtags: { values: hashtags },
  });
  revalidatePath("/");
}
