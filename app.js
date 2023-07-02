const searchform = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');

let searchQuery = '';
const APP_ID = '1376cad1';
const APP_Key = '012f69a6ff0b8cf69a9bfdbfaafee8f3';

searchform.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Key}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
 generateHTML(data.hits);
}
function generateHTML(results) {
  let generatedHTML = '';
  results.forEach((result) => {
    generatedHTML += `
      <div class="search-result">
        <div class="item">
          <img src="${result.recipe.image}" alt="${result.recipe.label}">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a href="${result.recipe.url}" target="_blank" class="view-button">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(1)}</p>
        </div>
      </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}


