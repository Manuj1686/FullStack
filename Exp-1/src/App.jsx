import { useState } from "react";

import PlatformSelector from "./components/PlatformSelector";
import PostComposer from "./components/PostComposer";
import ValidationPanel from "./components/ValidationPanel";
import PlatformPreview from "./components/PlatformPreview";

import "./App.css";

function App() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [postContent, setPostContent] = useState("");

  const handleClearPost = () => {
    setPostContent("");
    setSelectedPlatforms([]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Multi-Platform Post Composer</h1>
          <p>
            Create, validate and preview content across multiple platforms.
          </p>
        </div>

        <button
          type="button"
          className="clear-button"
          onClick={handleClearPost}
        >
          Clear Post
        </button>
      </header>

      <main className="main-container">
        <PlatformSelector
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
        />

        <PostComposer
          postContent={postContent}
          setPostContent={setPostContent}
        />

        <ValidationPanel
          selectedPlatforms={selectedPlatforms}
          postContent={postContent}
        />

        <PlatformPreview
          selectedPlatforms={selectedPlatforms}
          postContent={postContent}
        />
      </main>

      <footer className="app-footer">
        <p>Dynamic Multi-Platform Post Composer</p>
      </footer>
    </div>
  );
}

export default App;