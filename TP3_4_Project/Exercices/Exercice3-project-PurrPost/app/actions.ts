"use server";

import { db, postsColumn } from "@/db/schema";
import { revalidatePath } from "next/cache";
import {eq} from "drizzle-orm";
import {z} from "zod";

export async function newPost(text: string, hashtags: string[]) {
  await db.insert(postsColumn).values({
    text: text,
    hashtags: { values: hashtags },
  });
  revalidatePath("/");
}

const reportPostSchema = z.object({
  id: z.number({coerce: true}),
  reason: z.string(),
});

export async function reportPost(formData: FormData) {
  const { id, reason } = reportPostSchema.parse(Object.fromEntries(formData));

  await db
    .update(postsColumn)
    .set({ reported: true, reportedReason: reason })
    .where(
      eq(postsColumn.id, id)
    );
  revalidatePath("/");
}
