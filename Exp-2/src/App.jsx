import "./App.css";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";
import Stats from "./components/Stats";

function App() {
  return (
    <main className="app">
      <div className="background-blur blur-one"></div>
      <div className="background-blur blur-two"></div>

      <div className="container">
        <header className="header">
          <span className="badge">Redux Toolkit</span>

          <h1>Redux Post Manager</h1>

          <p className="subtitle">
            Create, organize and manage social media posts with a clean,
            modern interface powered by Redux Toolkit.
          </p>
        </header>

        <section className="create-post-card">
          <AddPost />
        </section>

        {/* Statistics Section */}
        <section className="stats-section">
          <Stats />
        </section>

        <div className="section-divider">
          <span>Recent Posts</span>
        </div>

        <section className="posts-section">
          <PostList />
        </section>
      </div>
    </main>
  );
}

export default App;