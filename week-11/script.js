const status = document.getElementById("status");
const tableBody = document.getElementById("table-body");

let lastPostId = null;

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function rankAuthors(posts, users) {
  const names = Object.fromEntries(
    users.map((user) => [user.id, user.name])
  );

  const grouped = posts.reduce((groups, post) => {
    const id = post.userId;

    if (!groups[id]) {
      groups[id] = {
        userId: id,
        name: names[id] ?? `Author ${id}`,
        words: 0,
        posts: []
      };
    }

    groups[id].words += wordCount(post.body);
    groups[id].posts.push(post);
    return groups;
  }, {});

  return Object.values(grouped).sort((a, b) => b.words - a.words);
}

function showPost(post, authorName) {
  document.getElementById("author").textContent = `A post from ${authorName}.`;
  document.getElementById("thought-title").textContent = post.title;
  document.getElementById("description").textContent = post.body;
  lastPostId = post.id;
}

function pickPost(author) {
  const options = author.posts.filter((post) => post.id !== lastPostId);
  const pool = options.length > 0 ? options : author.posts;
  const post = pool[Math.floor(Math.random() * pool.length)];
  showPost(post, author.name);
}

function fillTable(authors) {
  authors.forEach((author) => {
    const tableRow = document.createElement("tr");

    const nameCell = document.createElement("th");
    nameCell.scope = "row";

    const nameButton = document.createElement("button");
    nameButton.type = "button";
    nameButton.className = "author-name";
    nameButton.textContent = author.name;
    nameButton.addEventListener("click", () => {
      tableBody.querySelectorAll("tr").forEach((row) => {
        row.classList.remove("selected");
      });
      tableRow.classList.add("selected");
      pickPost(author);
    });

    nameCell.append(nameButton);

    const wordsCell = document.createElement("td");
    wordsCell.textContent = String(author.words);

    const postsCell = document.createElement("td");
    postsCell.textContent = String(author.posts.length);

    tableRow.append(nameCell, wordsCell, postsCell);
    tableBody.append(tableRow);
  });
}

async function loadPile() {
  status.textContent = "Looking through the pile...";

  try {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/users")
    ]);

    if (!postsResponse.ok) {
      throw new Error("The posts request failed.");
    }

    const posts = await postsResponse.json();
    const users = usersResponse.ok ? await usersResponse.json() : [];

    if (!Array.isArray(posts) || posts.length === 0) {
      status.textContent = "No thoughts arrived.";
      return;
    }

    fillTable(rankAuthors(posts, users));
    status.textContent = "Ranked by how much each author wrote.";
  } catch (error) {
    status.textContent = "That pile couldn't be retrieved.";
    console.error(error);
  }
}

loadPile();
