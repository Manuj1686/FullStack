import { platformRules } from "../data/platformRules";

function ValidationPanel({ selectedPlatforms, postContent }) {
  if (selectedPlatforms.length === 0) {
    return (
      <div className="validation-section">
        <h2>Platform Validation</h2>

        <div className="info-message">
          ℹ️ Select at least one platform to check content validation.
        </div>
      </div>
    );
  }

  return (
    <div className="validation-section">
      <h2>Platform Validation</h2>

      <div className="validation-list">
        {selectedPlatforms.map((platformKey) => {
          const platform = platformRules[platformKey];

          const characterCount = postContent.length;

          const remaining = platform.limit - characterCount;

          const isOverLimit = characterCount > platform.limit;

          const isNearLimit =
            characterCount >= platform.limit * 0.8 &&
            !isOverLimit;

          let status = "valid";

          if (isOverLimit) {
            status = "error";
          } else if (isNearLimit) {
            status = "warning";
          }

          return (
            <div
              key={platformKey}
              className={`validation-card ${status}`}
            >
              <div className="validation-info">
                <span className="validation-icon">
                  {platform.icon}
                </span>

                <div>
                  <h3>{platform.name}</h3>

                  {isOverLimit ? (
                    <p className="error-text">
                      Character limit exceeded by{" "}
                      {Math.abs(remaining)} characters.
                    </p>
                  ) : isNearLimit ? (
                    <p className="warning-text">
                      Warning: Only {remaining} characters remaining.
                    </p>
                  ) : (
                    <p className="valid-text">
                      Content meets platform requirements.
                    </p>
                  )}
                </div>
              </div>

              <div className="character-status">
                <strong>
                  {characterCount.toLocaleString()} /{" "}
                  {platform.limit.toLocaleString()}
                </strong>

                <span>
                  {isOverLimit
                    ? "❌"
                    : isNearLimit
                    ? "⚠️"
                    : "✓"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ValidationPanel;