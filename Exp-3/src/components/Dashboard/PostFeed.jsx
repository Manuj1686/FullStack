<<<<<<< HEAD
import { useState } from "react";
import {
  Edit3,
  Trash2,
  Save,
  X,
  FileText,
} from "lucide-react";

export default function PostFeed({
  user,
  posts = [],
  setPosts,
  savePosts,
  addActivity,
  permissions,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const canView = permissions?.canView === true;
  const canEdit = permissions?.canEdit === true;
  const canDelete = permissions?.canDelete === true;

  // No permission to view
  if (!canView) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-[#111111] p-8 text-center">

        <p className="text-red-400">
          You do not have permission to view posts.
        </p>

      </div>
    );
  }

  function startEdit(post) {
    if (!canEdit) return;

    setEditingId(post.id);
    setEditContent(post.content || "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditContent("");
  }

  function saveEdit(postId) {
    if (!canEdit) return;

    if (!editContent.trim()) return;

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            content: editContent.trim(),
            updatedAt: new Date().toISOString(),
          }
        : post
    );

    setPosts(updatedPosts);
    savePosts(updatedPosts);

    addActivity?.("Edited a post");

    cancelEdit();
  }

  function deletePost(postId) {
    if (!canDelete) return;

    const updatedPosts = posts.filter(
      (post) => post.id !== postId
    );

    setPosts(updatedPosts);
    savePosts(updatedPosts);

    addActivity?.("Deleted a post");
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-7">

      {/* HEADER */}

      <div className="mb-7 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
            <FileText size={21} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Posts
            </h2>

            <p className="text-sm text-zinc-500">
              {posts.length}{" "}
              {posts.length === 1 ? "post" : "posts"}
            </p>
          </div>

        </div>

        {/* ROLE BADGE */}

        <span
          className={`
            rounded-full
            border
            px-3
            py-1
            text-xs
            ${
              user?.role === "Administrator"
                ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                : user?.role === "Editor"
                ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                : "border-green-500/20 bg-green-500/10 text-green-400"
            }
          `}
        >
          {user?.role}
        </span>

      </div>

      {/* EMPTY STATE */}

      {posts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">

          <FileText
            size={35}
            className="mx-auto text-zinc-600"
          />

          <p className="mt-4 text-zinc-500">
            No posts available.
          </p>

        </div>
      )}

      {/* POSTS */}

      <div className="space-y-5">

        {posts.map((post) => (
          <div
            key={post.id}
            className="
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-5
              transition
              hover:border-yellow-500/20
            "
          >

            {/* POST HEADER */}

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 font-bold text-black">
                  {(post.author || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <p className="font-medium text-white">
                    {post.author || "User"}
                  </p>

                  <p className="text-xs text-zinc-600">
                    {post.createdAt
                      ? new Date(
                          post.createdAt
                        ).toLocaleString()
                      : ""}
                  </p>

                </div>

              </div>

              {/* ACTION BUTTONS */}

              <div className="flex gap-2">

                {/* EDIT */}

                {canEdit && editingId !== post.id && (
                  <button
                    type="button"
                    onClick={() => startEdit(post)}
                    className="
                      rounded-xl
                      border
                      border-blue-500/20
                      bg-blue-500/10
                      p-2.5
                      text-blue-400
                      transition
                      hover:bg-blue-500
                      hover:text-black
                    "
                    title="Edit Post"
                  >
                    <Edit3 size={17} />
                  </button>
                )}

                {/* DELETE */}

                {canDelete && (
                  <button
                    type="button"
                    onClick={() => deletePost(post.id)}
                    className="
                      rounded-xl
                      border
                      border-red-500/20
                      bg-red-500/10
                      p-2.5
                      text-red-400
                      transition
                      hover:bg-red-500
                      hover:text-white
                    "
                    title="Delete Post"
                  >
                    <Trash2 size={17} />
                  </button>
                )}

              </div>

            </div>

            {/* EDIT MODE */}

            {editingId === post.id ? (
              <div className="mt-5">

                <textarea
                  value={editContent}
                  onChange={(e) =>
                    setEditContent(e.target.value)
                  }
                  rows={5}
                  className="
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-blue-500/30
                    bg-[#080808]
                    p-4
                    text-white
                    outline-none
                    focus:border-blue-500
                  "
                />

                <div className="mt-3 flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-white/10
                      px-4
                      py-2
                      text-zinc-400
                      hover:bg-white/5
                    "
                  >
                    <X size={16} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => saveEdit(post.id)}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-yellow-500
                      px-4
                      py-2
                      font-medium
                      text-black
                      hover:bg-yellow-400
                    "
                  >
                    <Save size={16} />
                    Save
                  </button>

                </div>

              </div>
            ) : (
              <p className="mt-5 whitespace-pre-wrap leading-7 text-zinc-300">
                {post.content || ""}
              </p>
            )}

            {/* EDITED LABEL */}

            {post.updatedAt && (
              <p className="mt-3 text-xs text-zinc-600">
                Edited{" "}
                {new Date(
                  post.updatedAt
                ).toLocaleString()}
              </p>
            )}

          </div>
        ))}

      </div>

      {/* VIEW ONLY MESSAGE */}

      {user?.role === "Viewer" && (
        <div className="mt-6 rounded-2xl border border-green-500/10 bg-green-500/5 p-4 text-center">

          <p className="text-sm font-medium text-green-400">
            VIEW ONLY MODE
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Your account can view posts but cannot
            create, edit, or delete them.
          </p>

        </div>
      )}

      {/* EDITOR MESSAGE */}

      {user?.role === "Editor" && (
        <div className="mt-6 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4 text-center">

          <p className="text-sm font-medium text-blue-400">
            EDITOR MODE
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            You can edit posts but cannot create or
            delete posts.
          </p>

        </div>
=======
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

>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
      )}

    </div>
  );
}