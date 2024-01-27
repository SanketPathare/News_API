
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const country = "in";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
  
];

let requestURL;


const generateUI = (articles) => {
  for (const item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
    <img src="${item.urlToImage || "./newspaper.jpg"}" alt="img" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
      ${item.description || item.content || ""}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More</a>
    </div>`;
    container.appendChild(card);
  }
};

const getNews = async () => {
  container.innerHTML = "";
  const response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  const data = await response.json();
  generateUI(data.articles);
};


const selectCategory = (e, category) => {
  const options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`;
  e.target.classList.add("active");
  getNews();
};


const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == "general" ? "active" : ""
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

const init = () => {
  optionsContainer.innerHTML = "";
  getNews();
  createOptions();
};

window.onload = () => {
  requestURL = `https://saurav.tech/NewsAPI/top-headlines/category/general/in.json`;
  init();
};
