import { createSelector } from "@reduxjs/toolkit";

// Basic Selector
const selectPosts = (state) => state.posts.posts;

// Total Posts
export const totalPosts = createSelector(
  [selectPosts],
  (posts) => posts.length
);

// Published Posts
export const publishedPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter((post) => post.status === "Published")
);

// Draft Posts
export const draftPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter((post) => post.status === "Draft")
);

// Posts by Platform
export const postsByPlatform = createSelector(
  [selectPosts],
  (posts) => {
    const grouped = {};

    posts.forEach((post) => {
      grouped[post.platform] = (grouped[post.platform] || 0) + 1;
    });

    return grouped;
  }
);