import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const postsColumn = sqliteTable("posts", {
  id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  text: text("text").notNull(),
  hashtags: text("hashtags", { mode: "json" })
    .$type<{ values: string[] }>()
    .default({ values: [] })
    .notNull(),
});

export const db = drizzle(client, {
  schema: {
    posts: postsColumn,
  },
});
