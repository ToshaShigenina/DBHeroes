'use strict';

window.addEventListener('DOMContentLoaded', () => {

  let content = document.getElementById('content');

  const addCards = (arr) => {
    content.innerHTML = '';

    arr.forEach((item) => {
      const card = document.createElement('div'),
        films = document.createElement('ul');

      card.classList.add('card');
      films.classList.add('card__films');

      card.innerHTML = `<div class="card__icon">
        <!--<img src="${item['photo']}" alt="">-->
      </div>
      <h3 class="card__hero-name">${item['name']}</h3>
      <h4 class="card__name">${item['actors']}</h4>
      <div class="card__status">${item['status']}</div>`;

      if (item['movies']) {
        item['movies'].forEach((item) => {
          let li = document.createElement('li');
          li.textContent = item;
          films.append(li);
        });
      }

      card.append(films);
      content.append(card);
    });
  };

  const loadJSON = (id = 'all', param = 'all') => {
    const request = new XMLHttpRequest();
    request.open('GET', './dbHeroes.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

    request.addEventListener('readystatechange', (event) => {
      if (request.readyState === 4 && request.status === 200) {
        let data = JSON.parse(request.responseText);
        if (param !== 'all') {
          data = data.filter((item) => {
            if (item[id] && item[id] === param) {
              return item;
            }
          });
          console.log(data);
        }

        addCards(data);
      }
    });
  };

  loadJSON();

  document.body.addEventListener('change', (event) => {
    let target = event.target;

    if (target.matches('input')) {
      loadJSON(target.id, target.value);
    }
  });

});
