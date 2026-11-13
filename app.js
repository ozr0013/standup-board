// Standup Board: add, save and render posts.
// Contract: form#post-form, section#posts, localStorage "standup-posts"
// holding [{ name, yesterday, today, blockers, at }] with `at` as an ISO time.

const STORAGE_KEY = "standup-posts";

const form = document.getElementById("post-form");
const list = document.getElementById("posts");

function loadPosts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function line(className, label, value) {
  const p = document.createElement("p");
  p.className = className;
  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;
  p.append(strong, value);
  return p;
}

function renderPost(post) {
  const article = document.createElement("article");
  article.className = "post";

  const name = document.createElement("h3");
  name.className = "post-name";
  name.textContent = post.name;

  const time = document.createElement("time");
  time.className = "post-time";
  time.dateTime = post.at;
  const date = new Date(post.at);
  time.textContent = Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

  article.append(
    name,
    line("post-yesterday", "Yesterday", post.yesterday),
    line("post-today", "Today", post.today),
    line("post-blockers", "Blockers", post.blockers || "None"),
    time,
  );
  return article;
}

function render() {
  const posts = loadPosts().sort((a, b) => String(b.at).localeCompare(String(a.at)));
  list.replaceChildren(...posts.map(renderPost));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const value = (key) => String(data.get(key) || "").trim();

  const post = {
    name: value("name"),
    yesterday: value("yesterday"),
    today: value("today"),
    blockers: value("blockers"),
    at: new Date().toISOString(),
  };
  if (!post.name || !post.yesterday || !post.today) return;

  savePosts([...loadPosts(), post]);
  render();

  // Keep the name filled in so the same person can post again quickly.
  form.reset();
  form.elements.namedItem("name").value = post.name;
  form.elements.namedItem("yesterday").focus();
});

// Stay in sync if the board is open in another tab.
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY) render();
});

render();
