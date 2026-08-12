import { useState } from "react";
import { motion } from "framer-motion";
import { SendHorizontal, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import GlassCard from "./GlassCard";

export default function PostComposer({
  user,
  posts,
  setPosts,
  savePosts,
  addActivity,
}) {
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Post cannot be empty");
      return;
    }

    const newPost = {
      id: Date.now(),
      author: user.name,
      role: user.role,
      content,
      likes: 0,
      createdAt: new Date().toLocaleString(),
    };

    const updatedPosts = [newPost, ...posts];

    setPosts(updatedPosts);

    savePosts(updatedPosts);

    addActivity("Created a new post");

    toast.success("Post Published");

    setContent("");
  }

  return (
    <GlassCard className="p-8">

      <div className="flex items-center gap-3">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-xl font-bold text-black shadow-[0_0_25px_rgba(212,175,55,.35)]">

          {user.name.charAt(0)}

        </div>

        <div>

          <h2 className="text-xl font-semibold">

            {user.name}

          </h2>

          <p className="text-sm text-zinc-500">

            {user.role}

          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8"
      >

        <textarea
          rows={6}
          maxLength={300}
          value={content}
          placeholder="Share your thoughts with everyone..."
          onChange={(e) => setContent(e.target.value)}
          className="
          w-full
          resize-none
          rounded-3xl
          border
          border-white/10
          bg-black/30
          p-6
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

        <div className="mt-6 flex items-center justify-between">

          <div className="flex items-center gap-2 text-sm text-zinc-500">

            <Sparkles
              size={16}
              className="text-yellow-500"
            />

            {content.length} / 300 Characters

          </div>

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: .97,
            }}
            className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-yellow-400
            to-yellow-600
            px-7
            py-3
            font-semibold
            text-black
            shadow-[0_15px_35px_rgba(212,175,55,.25)]
            "
          >

            <SendHorizontal size={18} />

            Publish

          </motion.button>

        </div>

      </form>

    </GlassCard>
  );
}