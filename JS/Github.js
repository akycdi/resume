const username = "akycdi";
const url = `https://api.github.com/users/${username}/repos`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Update the page with the repository information
    data.data.forEach(repo => {
      // create new elements
      const repoItem = document.createElement("li");
      const repoLink = document.createElement("a");
      const repoDescription = document.createElement("p");
      const repoImage = document.createElement("img");
      // Fetch the repository's summary image
      fetch(`https://api.github.com/repos/${username}/${repo.name}/contents/summary.jpg`)
        .then(response => response.json())
        .then(imageData => {
          // Update the src attribute of the image element with the image's URL
          repoImage.src = imageData.download_url;
          // Append the image element to the page
          repoItem.appendChild(repoImage);
        });
      repoLink.href = repo.html_url;
      repoLink.textContent = repo.name;
      repoDescription.textContent = repo.description;
      repoItem.appendChild(repoLink);
      repoItem.appendChild(repoDescription);
      document.querySelector("#repos").appendChild(repoItem);
    });
  });