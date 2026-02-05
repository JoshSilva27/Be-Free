const STORAGE_KEY = "beFreeStories";

function getStories() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveStories(stories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
}

function submitStory() {
  const sobrietyTime = document.getElementById("sobrietyTime").value.trim();
  const storyText = document.getElementById("storyText").value.trim();
  const tag = document.getElementById("storyTag").value;
  const consent = document.getElementById("consentBox").checked;

  if (!storyText) {
    alert("Please write something before sharing.");
    return;
  }

  if (!consent) {
    alert("Please confirm you understand this will be shared anonymously.");
    return;
  }

  const newStory = {
    sobrietyTime: sobrietyTime || "Not shared",
    text: storyText,
    tag: tag === "All" ? "Uncategorized" : tag,
    date: new Date().toLocaleString()
  };

  const stories = getStories();
  stories.unshift(newStory);
  saveStories(stories);

  document.getElementById("sobrietyTime").value = "";
  document.getElementById("storyText").value = "";
  document.getElementById("storyTag").value = "All";
  document.getElementById("consentBox").checked = false;

  renderStories();
}

function renderStories() {
  const feed = document.getElementById("storyFeed");
  const filter = document.getElementById("filterTag").value;
  const stories = getStories();

  feed.innerHTML = "";

  const filtered = filter === "All"
    ? stories
    : stories.filter(s => s.tag === filter);

  if (filtered.length === 0) {
    feed.innerHTML = "<p>No stories yet. Be the first to share.</p>";
    return;
  }

  filtered.forEach(story => {
    const card = document.createElement("div");
    card.className = "story-card";

    card.innerHTML = `
      <div class="story-meta">
        <span class="tag">${story.tag}</span>
        <span class="time">${story.sobrietyTime}</span>
        <span class="date">${story.date}</span>
      </div>
      <p>${story.text}</p>
    `;

    feed.appendChild(card);
  });
}

// Load stories on page open
renderStories();
