const posts = [
  {
    title: "Blog Post #1",
    author: "Ajay Temal",
    date: "October 12, 2026",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    title: "Blog Post #2",
    author: "Ajay Temal",
    date: "October 19, 2026",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    title: "Blog Post #3",
    author: "Ajay Temal",
    date: "October 26, 2026",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    title: "Blog Post #4",
    author: "Ajay Temal",
    date: "November 2, 2026",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "Blog Post #5",
    author: "Ajay Temal",
    date: "November 3, 2026",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
  }
];

let currentIndex = 0;

const nextButton = document.getElementById("next");
const form = document.getElementById("question-form");
const answer = document.getElementById("answer");
const reply = document.getElementById("reply");

function showPost() {
  document.querySelector("h1").textContent = posts[currentIndex].title;
  document.getElementById("author").textContent = posts[currentIndex].author;
  document.getElementById("description").textContent = posts[currentIndex].description;
}

nextButton.addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % posts.length;
  showPost();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = answer.value.trim();

  reply.classList.remove("found", "missing");

  if (value === "") {
    reply.textContent = "You haven't told me what you're looking for.";
    reply.classList.add("missing");
    return;
  }

  let matchIndex = -1;

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title.toLowerCase() === value.toLowerCase()) {
      matchIndex = i;
    }
  }

  if (matchIndex !== -1) {
    currentIndex = matchIndex;
    showPost();
    reply.textContent = "Here it is.";
    reply.classList.add("found");
  } else {
    reply.textContent = `I don't know where to find ${value}.`;
    reply.classList.add("missing");
  }
});

showPost();

for (const item of posts) {
  const card = document.createElement("p");
  card.textContent = item.title;
  document.getElementById("archive").appendChild(card);
}
