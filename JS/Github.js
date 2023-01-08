async function getRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await response.json();
  return data;
}

async function main() {
  const repos = await getRepos("akycdi");
  console.log(repos);

  var cardContainer = document.getElementById('cardcontainer');


  repos.forEach((item) => {
    var columncard = document.createElement('div');
    var card = document.createElement('div')
    var card_inner = document.createElement("div");
    var button = document.createElement('button');
    var h2Name = document.createElement('h6');
    var paragraph = document.createElement('p');

    card_inner.className = "card-body"
    card.className = "card";
    columncard.className = "col-md-4 col-sm-6 col-lg-3";
    paragraph.appendChild(document.createTextNode(item.description));
    h2Name.appendChild(document.createTextNode(item.name));


    button.type = 'button';
    button.innerHTML = item.name;
    button.className = 'btn btn-primary btn-sm';
    button.onclick = function () {
      window.open(item.html_url, '_blank');
    };

    card_inner.appendChild(h2Name);
    card_inner.appendChild(paragraph);
    card_inner.appendChild(button);
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

main();