import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import GlassCard from "./GlassCard";

export default function PostCard({
  post,
  posts,
  setPosts,
  savePosts,
  addActivity,
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);

  function handleLike() {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  }

  function handleDelete() {
    const updatedPosts = posts.filter((p) => p.id !== post.id);

    setPosts(updatedPosts);

    savePosts(updatedPosts);

    addActivity("Deleted a post");

    toast.success("Post Deleted");
  }

  return (
    <GlassCard className="p-7">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-yellow-400
            to-yellow-600
            text-lg
            font-bold
            text-black
            shadow-[0_0_25px_rgba(212,175,55,.35)]
            "
          >
            {post.author.charAt(0)}
          </div>

          <div>

            <h3 className="text-lg font-semibold">
              {post.author}
            </h3>

            <p className="text-sm text-zinc-500">
              {post.role}
            </p>

          </div>

        </div>

        <p className="text-sm text-zinc-500">
          {post.createdAt}
        </p>

      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-white/10" />

      {/* Content */}

      <p className="whitespace-pre-wrap text-lg leading-8 text-zinc-300">
        {post.content}
      </p>

      {/* Divider */}

      <div className="my-6 h-px bg-white/10" />

      {/* Actions */}

      <div className="flex items-center justify-between">

        <div className="flex gap-4">

          <motion.button
            whileTap={{ scale: .9 }}
            onClick={handleLike}
            className={`
            flex
            items-center
            gap-2
            rounded-xl
            px-4
            py-2
            transition

            ${
              liked
                ? "bg-red-500/10 text-red-500"
                : "text-zinc-400 hover:bg-red-500/10 hover:text-red-500"
            }
            `}
          >
            <Heart
              size={18}
              fill={liked ? "currentColor" : "none"}
            />

            {likes}
          </motion.button>

          <button
            className="
            flex
            items-center
            gap-2
            rounded-xl
            px-4
            py-2
            text-zinc-400
            transition
            hover:bg-blue-500/10
            hover:text-blue-400
            "
          >
            <MessageCircle size={18} />

            Comment
          </button>

          <button
            className="
            flex
            items-center
            gap-2
            rounded-xl
            px-4
            py-2
            text-zinc-400
            transition
            hover:bg-yellow-500/10
            hover:text-yellow-500
            "
          >
            <Share2 size={18} />

            Share
          </button>

        </div>

        <button
          onClick={handleDelete}
          className="
          flex
          items-center
          gap-2
          rounded-xl
          px-4
          py-2
          text-red-500
          transition
          hover:bg-red-500/10
          "
        >
          <Trash2 size={18} />

          Delete
        </button>

      </div>

    </GlassCard>
  );
}