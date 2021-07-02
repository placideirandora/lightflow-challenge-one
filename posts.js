window.onload = () => {
  const loader = document.querySelector(".loader");
  const button = document.querySelector(".button");
  const content = document.querySelector(".content");
  const subHeading = document.querySelector(".sub-heading");

  loader.style.display = "flex";
  button.addEventListener("click", displayHomepage);

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const userId = param.get("userId");
  const name = param.get("name");

  subHeading.innerHTML = `${name.split(" ")[0]}'s posts`;

  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then((response) => response.json())
    .then((data) => {
      posts = data;
      loader.style.display = "none";
      content.style.display = "flex";
      displayPosts(data);
    })
    .catch((error) => {
      loader.style.display = "none";
      alert("Could not fetch posts");
      console.error("Error:", error);
    });
};

const displayPosts = (data) => {
  for (const post of data) {
    document.querySelector(".content").innerHTML += `
      <div class='post-card'>
        <p class='post-title'>${post.title}</p>
        <div class='post-card-content'>
          <p class='post-body'>${post.body}.</p>
        </div>
      </div>`;
  }
};

const displayHomepage = () => {
  const url = new URL(window.location.href);
  window.location.href = `${url.origin}/lightflow-challenge-one/index.html`;
};
