const anotherButton = document.getElementById("another");
const status = document.getElementById("status");

function showPost(post) {
  document.querySelector("h1").textContent = post.title;
  document.getElementById("author").textContent = "from JSONPlaceholder";
  document.getElementById("description").textContent = post.body;
}

async function loadThought() {
  status.textContent = "Looking for a thought...";
  anotherButton.disabled = true;

  try {
    const number = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${number}`
    );

    if (!response.ok) {
      throw new Error("The request failed.");
    }

    const post = await response.json();

    if (!post.title) {
      status.textContent = "No thought arrived.";
      return;
    }

    showPost(post);
    status.textContent = "A thought has arrived.";
  } catch (error) {
    status.textContent = "That thought couldn't be retrieved.";
    console.error(error);
  } finally {
    anotherButton.disabled = false;
  }
}

anotherButton.addEventListener("click", loadThought);

loadThought();
