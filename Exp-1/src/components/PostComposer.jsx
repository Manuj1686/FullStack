function PostComposer({ postContent, setPostContent }) {
  return (
    <div className="composer-section">
      <div className="composer-header">
        <h2>Create Post</h2>

        <span className="global-counter">
          {postContent.length} characters
        </span>
      </div>

      <textarea
        placeholder="What's on your mind? Start creating your post..."
        value={postContent}
        onChange={(event) => setPostContent(event.target.value)}
      />

      <div className="composer-footer">
        <span>✍️ Write your content</span>

        <span>
          {postContent.length} characters entered
        </span>
      </div>
    </div>
  );
}

export default PostComposer;