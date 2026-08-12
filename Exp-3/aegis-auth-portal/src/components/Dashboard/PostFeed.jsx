import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import GlassCard from "./GlassCard";
import PostCard from "./PostCard";

export default function PostFeed({
  posts,
  setPosts,
  savePosts,
  addActivity,
}) {
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <GlassCard className="p-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-3xl font-bold">

              Recent Posts

            </h2>

            <p className="mt-2 text-zinc-500">

              {filteredPosts.length} Posts Published

            </p>

          </div>

          <div className="relative w-full lg:w-80">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-black/30
              py-3
              pl-11
              pr-4
              text-white
              outline-none
              transition-all
              duration-300
              placeholder:text-zinc-600
              focus:border-yellow-500
              focus:ring-2
              focus:ring-yellow-500/20
              "
            />

          </div>

        </div>

      </GlassCard>

      {/* Empty */}

      {filteredPosts.length === 0 ? (

        <GlassCard className="p-14">

          <div className="text-center">

            <h2 className="text-3xl font-bold">

              No Posts Found

            </h2>

            <p className="mt-4 text-zinc-500">

              Try creating a new post or changing your search.

            </p>

          </div>

        </GlassCard>

      ) : (

        <div className="space-y-6">

          {filteredPosts.map((post, index) => (

            <motion.div
              key={post.id}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
            >
              <PostCard
                post={post}
                posts={posts}
                setPosts={setPosts}
                savePosts={savePosts}
                addActivity={addActivity}
              />
            </motion.div>

          ))}

        </div>

      )}

    </div>
  );
}