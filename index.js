function createPost() {
  const textarea = document.querySelector(".post-input textarea");
  const content = textarea.value.trim();

  if (content) {
    const post = document.createElement("div");
    post.className = "post";
    post.innerHTML = `
        <div class="post-header">
          <img src="https://via.placeholder.com/40" alt="User" />
          <div>
            <h4>John Doe</h4>
            <p>Software Engineer • 1st</p>
            <small>Just now</small>
          </div>
        </div>
        <p>${content}</p>
        <div class="post-actions">
          <button class="like-btn">👍 Like</button>
          <button class="dislike-btn">👎 Dislike</button>
        </div>
        <div class="comment-section">
          <textarea placeholder="Add a comment..." rows="2"></textarea>
          <button class="comment-btn">Comment</button>
        </div>
      `;

    const mainContent = document.querySelector(".main-content");
    mainContent.insertBefore(post, mainContent.children[1]);
    textarea.value = "";

    post.querySelector(".like-btn").addEventListener("click", () => {
      alert("You liked this post!");
    });

    post.querySelector(".dislike-btn").addEventListener("click", () => {
      alert("You disliked this post!");
    });

    post.querySelector(".comment-btn").addEventListener("click", (event) => {
      const commentBox = event.target.previousElementSibling;
      if (commentBox.value.trim() !== "") {
        alert("Comment added: " + commentBox.value);
        commentBox.value = "";
      } else {
        alert("Please enter a comment.");
      }
    });
  }
}

document.querySelectorAll(".like-btn").forEach((button) => {
  button.addEventListener("click", () => {
    alert("You liked this post!");
  });
});

document.querySelectorAll(".dislike-btn").forEach((button) => {
  button.addEventListener("click", () => {
    alert("You disliked this post!");
  });
});

document.querySelectorAll(".comment-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const commentBox = event.target.previousElementSibling;
    if (commentBox.value.trim() !== "") {
      alert("Comment added: " + commentBox.value);
      commentBox.value = "";
    } else {
      alert("Please enter a comment.");
    }
  });
});
