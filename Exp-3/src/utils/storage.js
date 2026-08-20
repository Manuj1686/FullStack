// -------------------------
// POSTS
// -------------------------

export function loadPosts() {
  const posts = localStorage.getItem("posts");

  if (!posts) return [];

  return JSON.parse(posts);
}

export function savePosts(posts) {
  localStorage.setItem(
    "posts",
    JSON.stringify(posts)
  );
}

// -------------------------
// ACTIVITY LOG
// -------------------------

export function loadActivity() {
  const activity = localStorage.getItem("activity");

  if (!activity) return [];

  return JSON.parse(activity);
}

export function saveActivity(activity) {
  localStorage.setItem(
    "activity",
    JSON.stringify(activity)
  );
}

// -------------------------
// ADD ACTIVITY
// -------------------------

export function addActivity(message) {

  const activity = loadActivity();

  const newActivity = {
    id: Date.now(),

    message,

    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  activity.unshift(newActivity);

  saveActivity(activity);
}