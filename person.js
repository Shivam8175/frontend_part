function createPost() {
  let input = document.querySelector(".post-box input");
  let text = input.value;
  if (text.trim() === "") return;

  let post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `<h4>You</h4><p>${text}</p>`;

  document.querySelector(".posts").prepend(post);
  input.value = "";
}
