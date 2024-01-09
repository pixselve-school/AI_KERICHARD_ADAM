import NewPostForm from "@/components/new-post-form";
import generateCatName from "@/lib/catName";
import { db, postsColumn } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function Home() {
  const posts = await db.query.posts.findMany({
    orderBy: [desc(postsColumn.id)],
    limit: 20,
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

function Post({
  text,
  hashtags,
}: {
  text: string;
  hashtags: { values: string[] };
}) {
  const name = generateCatName(text);

  return (
    <div className="rounded-lg overflow-hidden bg-white border border-gray-200 flex items-start p-4 gap-4">
      <img
        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${name}`}
        width={50}
        height={50}
        alt=""
        className="rounded-full overflow-hidden"
      />
      <div>
        <div>
          <div className="font-bold text-xl mb-2">{generateCatName(text)}</div>
          <p className="text-gray-700 text-base">{text}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {hashtags.values.map((hashtag) => (
            <span
              key={hashtag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{hashtag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
