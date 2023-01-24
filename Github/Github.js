var data
var username = 'akycdi'

async function getRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  data = await response.json();
  return data;
}

async function main() {
  const repos = await getRepos(username);
  console.log(repos);

  var cardContainer = document.getElementById('cardcontainer');


  repos.forEach((item) => {
    var columncard = document.createElement('div');
    var card = document.createElement('div')
    var card_inner = document.createElement("div");
    var button = document.createElement('button');
    var h2Name = document.createElement('h6');
    var paragraph = document.createElement('p');
    var canvas = document.createElement('canvas')
    //createCanvas(canvas);
    card_inner.className = "card-body"
    card.className = "card cardStyle";
    columncard.className = "col-md-4 col-sm-6 col-lg-3";
    paragraph.appendChild(document.createTextNode(item.description));
    h2Name.appendChild(document.createTextNode(item.name));

    button.type = 'button';
    button.innerHTML = item.name;
    button.className = 'btn btn-primary btn-sm';

    button.onclick = function () {
      window.open(item.html_url)
    };

    card_inner.appendChild(h2Name);
    card_inner.appendChild(paragraph);
    card_inner.appendChild(button);
    card_inner.appendChild(canvas);
    card.appendChild(card_inner);
    columncard.appendChild(card);
    cardContainer.appendChild(columncard);

  });

  var i = 0;
  repos.forEach(element => {
    console.log(i++);
    console.log(element.name);
    console.log(element.url);

  });
}

async function createCanvas(canvas) {

    //canvas code 
    const ctx = canvas.getContext("2d");
    // Set the canvas size
    canvas.width = 300;
    canvas.height = 200;
    // Iterate over all repositories
    for (let repo of data) {
      const { name, description, html_url } = repo;
      // Get the last commit for the repository
      const commitResponse = await fetch(`https://api.github.com/repos/${username}/${name}/commits`);
      const commit = await commitResponse.json();
      const { commit: { message, author: { name: authorName, email } } } = commit[0];
      // Generate the rich link preview image
      ctx.fillStyle = "grey";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "yellow";
      ctx.font = "20px Arial";
      ctx.fillText(name, 10, 30);
      ctx.fillText(authorName, 10, 60);
      ctx.fillText(message, 10, 90);
      ctx.fillText(description, 10, 120);
      ctx.fillText(html_url, 10, 150);
    }
    //end

}
main();


const carousel = document.querySelector("#carousel");
const images = carousel.querySelectorAll("img");
let currentImageIndex = 0;

setInterval(() => {
  images.forEach((image, index) => {
    if (index === currentImageIndex) {
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }
  });

  currentImageIndex = currentImageIndex + 1 === images.length ? 0 : currentImageIndex + 1;
}, 5000);
