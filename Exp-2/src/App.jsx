import "./App.css";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";

function App() {
  return (
    <main className="app">
      <div className="container">

        <header className="header">
          <h1>Redux Post Manager</h1>

          <p className="subtitle">
            A simple application to create, manage, and organize posts using Redux Toolkit.
          </p>
        </header>

        <section className="content">
          <AddPost />

          <div className="section-divider"></div>

          <PostList />
        </section>

      </div>
    </main>
  );
}

export default App;