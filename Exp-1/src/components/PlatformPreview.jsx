import { platformRules } from "../data/platformRules";

function PlatformPreview({ selectedPlatforms, postContent }) {
  if (selectedPlatforms.length === 0) {
    return null;
  }

  return (
    <div className="preview-section">
      <h2>Platform Preview</h2>

      <div className="preview-grid">
        {selectedPlatforms.map((platformKey) => {
          const platform = platformRules[platformKey];

          return (
            <div className="preview-card" key={platformKey}>
              <div className="preview-header">
                <span className="preview-icon">
                  {platform.icon}
                </span>

                <div>
                  <h3>Post Creator</h3>
                  <small>{platform.name}</small>
                </div>
              </div>

              <div className="preview-content">
                {postContent ||
                  "Your post preview will appear here..."}
              </div>

              <div className="preview-footer">
                <span>♡ Like</span>
                <span>💬 Comment</span>
                <span>↗ Share</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlatformPreview;