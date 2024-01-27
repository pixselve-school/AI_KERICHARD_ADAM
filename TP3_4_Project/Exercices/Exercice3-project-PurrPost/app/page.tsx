import NewPostForm from "@/components/new-post-form";
import { db, postsColumn } from "@/db/schema";
import {desc, eq} from "drizzle-orm";
import Post from "@/components/Post";

export default async function Home() {
  const posts = await db.query.posts.findMany({
    orderBy: [desc(postsColumn.id)],
    limit: 20,
    where: eq(postsColumn.reported, false),
  });

  return (
    <main className="space-y-6">
      <NewPostForm></NewPostForm>
      <div className="grid-cols-1 grid gap-2">
        {posts.map((post) => (
          <Post key={post.id} {...post}></Post>
        ))}
      </div>
    </main>
  );
}

