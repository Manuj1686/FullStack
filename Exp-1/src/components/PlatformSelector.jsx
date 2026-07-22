import { platformRules } from "../data/platformRules";

function PlatformSelector({
  selectedPlatforms,
  setSelectedPlatforms,
}) {
  const handlePlatformChange = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(
        selectedPlatforms.filter((item) => item !== platform)
      );
    } else {
      setSelectedPlatforms([
        ...selectedPlatforms,
        platform,
      ]);
    }
  };

  return (
    <div className="platform-section">
      <h2>Select Platforms</h2>

      <p className="section-description">
        Choose the social media platforms where you want to publish.
      </p>

      <div className="platform-grid">
        {Object.entries(platformRules).map(
          ([key, platform]) => (
            <button
              key={key}
              className={`platform-card ${
                selectedPlatforms.includes(key)
                  ? "selected"
                  : ""
              }`}
              onClick={() => handlePlatformChange(key)}
            >
              <span className="platform-icon">
                {platform.icon}
              </span>

              <span>{platform.name}</span>

              <small>
                {platform.limit.toLocaleString()} characters
              </small>
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default PlatformSelector;