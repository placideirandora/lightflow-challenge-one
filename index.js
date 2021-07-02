window.onload = () => {
  const loader = document.querySelector(".loader");
  const content = document.querySelector(".content");

  loader.style.display = "flex";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";
      content.style.display = "flex";
      displayUsers(data);
    })
    .catch((error) => {
      loader.style.display = "none";
      alert("Could not fetch users");
      console.error("Error:", error);
    });
};

const displayUsers = (data) => {
  for (const user of data) {
    document.querySelector(".content").innerHTML += `
    <div class='user-card'>
       <p class='name'>${user.name}</p>
       <div class='user-card-content'> 
          <i class='fas fa-envelope'></i> 
          <p class='email'>${user.email}</p>
       </div>
          <button onclick="displayUserPostsPage('${user.id}','${user.name}')" 
          class='button'>view posts</button>
    </div>
     `;
  }
};

const displayUserPostsPage = (userId, name) => {
  const url = new URL(window.location.href);
  window.location.href = `${url.origin}/lightflow-challenge-one/posts.html?userId=${userId}&name=${name}`;
};
