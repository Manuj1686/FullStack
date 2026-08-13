import { useState } from "react";
import { Send } from "lucide-react";

export default function PostComposer({
  user,
  posts = [],
  setPosts,
  savePosts,
  addActivity,
  permissions,
}) {
  const [content, setContent] = useState("");

  const canCreate =
    permissions?.canCreate === true;

  if (!canCreate) {
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!permissions?.canCreate) {
      return;
    }

    if (!content.trim()) {
      return;
    }

    const newPost = {
      id: Date.now(),
      author: user?.name || "User",
      email: user?.email || "",
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedPosts = [
      newPost,
      ...posts,
    ];

    setPosts(updatedPosts);
    savePosts(updatedPosts);

    if (addActivity) {
      addActivity("Created a new post");
    }

    setContent("");
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-7">

      <div>

        <h2 className="text-2xl font-bold text-white">
          Create Post
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Share something with your workspace.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6"
      >

        <textarea
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          rows={5}
          placeholder="What's on your mind?"
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-white/10
            bg-[#080808]
            p-5
            text-white
            placeholder:text-zinc-600
            outline-none
            transition
            focus:border-yellow-500/40
          "
        />

        <div className="mt-4 flex justify-end">

          <button
            type="submit"
            disabled={!content.trim()}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-yellow-500
              px-5
              py-3
              font-medium
              text-black
              transition
              hover:bg-yellow-400
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Send size={17} />
            Publish Post
          </button>

        </div>

      </form>

    </div>
  );
}