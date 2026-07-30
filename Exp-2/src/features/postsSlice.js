import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Redux Toolkit",
      platform: "Instagram",
      status: "Published",
    },
    {
      id: 2,
      title: "React Hooks",
      platform: "LinkedIn",
      status: "Draft",
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    updatePost: (state, action) => {
      const post = state.posts.find(
        (p) => p.id === action.payload.id
      );

      if (post) {
        post.title = action.payload.title;
        post.platform = action.payload.platform;
        post.status = action.payload.status;
      }
    },
  },
});

export const {
  addPost,
  deletePost,
  updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;