let timeframe = 'weekly';
const container = document.querySelector('.container');
let regularCards; 

const menu = document.querySelectorAll('.menu-link');

menu.forEach(element => {
    element.addEventListener('click', menuOnClick);
});

let data = {};

fetch('./js/data.json')
    .then(resp => resp.json())
    .then(jsonData => {

        jsonData.forEach(element => {
            container.insertAdjacentHTML('beforeend',
                createRegularCard(element, timeframe));
        });

        jsonData.forEach(element => {
            data[element.title] = element.timeframes;
        });

        regularCards = document.querySelectorAll('.regular-card');
    });

// Functions
function menuOnClick(event){
    menu.forEach(element => {
        element.classList.remove('menu-active');
    });
    event.target.classList.add('menu-active');
    timeframe = event.target.innerText.toLowerCase();

    updateCards(timeframe);
}

function updateCards(timeframe){
    regularCards.forEach(card => {
        updateCard(card, timeframe);
    });
}

function updateCard(card, timeframe) {
    const title = card.querySelector('.title').innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    };

    const hoursElement = card.querySelector('.hours');
    hoursElement.innerText = `${current}hrs`;
    const msgElement = card.querySelector('.description');
    msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createRegularCard(element, timeframe){
    // Con esto lo que hacemos es insertar desde aca todo el html, sin tener que escribirlo manualmente nosotros en el index
    let title = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    };

    return`
<div class="regular-card ${title.toLowerCase().replace(/\s/g, '')}">
    <div class="property-card">
      <div class="row">
        <div class="title">${title}</div>
        <div class="points">
          <div class="point"></div>
          <div class="point"></div>
          <div class="point"></div>
        </div>
      </div>

      <div class="row-2">
        <div class="hours">${current}hrs</div>
        <div class="description">${timeframeMsg[timeframe]} - ${previous}hrs</div>
      </div>
    </div>
</div>`
}