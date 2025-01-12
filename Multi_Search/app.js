const input = document.querySelector("input");
const form = document.querySelector("form");
const left = document.getElementById("left");
const right = document.getElementById("right");
const btnClearInput = document.getElementById("clear-input");
const mainSearchInput = document.getElementById("mainSearchInput");
const leftSearchEngineSelect = document.getElementById(
  "leftSearchEngineSelect"
);
const rightSearchEngineSelect = document.getElementById(
  "rightSearchEngineSelect"
);

let leftUrl = updateSearchEngine(left, leftSearchEngineSelect);
let rightUrl = updateSearchEngine(right, rightSearchEngineSelect);

function updateSearchEngine(element, engineSelect) {
  const selectedUrl = engineSelect.value;

  if (input.value.trim()) {
    element.src = selectedUrl + input.value;
    return selectedUrl;
  }

  element.src = selectedUrl;
  return selectedUrl;
}

leftSearchEngineSelect.addEventListener("change", () => {
  leftUrl = updateSearchEngine(left, leftSearchEngineSelect);
});

rightSearchEngineSelect.addEventListener("change", () => {
  rightUrl = updateSearchEngine(right, rightSearchEngineSelect);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (value) {
    const leftSrc = `${leftUrl}${value}`;
    const rightSrc = `${rightUrl}${value}`;

    left.src = leftSrc;
    right.src = rightSrc; 
  }
});
//loaded indicator
left.addEventListener("load", function () {
  this.style.border = "2px solid  #939393";
  setTimeout(() => mainSearchInput.focus(), 100);
});
right.addEventListener("load", function () {
  this.style.border = "2px solid  #939393";
  setTimeout(() => mainSearchInput.focus(), 100);
});

//TODO: stop perplexity or other iframe sites from gaining auto focus

//Goal: Get data from url and search that
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  const data = decodeURIComponent(getQueryVariable("data"));
  if (data != "false") {
    input.value = data;
    form.requestSubmit();
  }
});

btnClearInput.addEventListener("click", (e) => {
  e.preventDefault();
  input.value = "";
  input.textContent = "";
});