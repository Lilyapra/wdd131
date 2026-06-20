// Basic search form behavior.
// Prevents the page from reloading and logs the search term for now.
// You can replace this with real filtering/search logic later.

const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.getElementById("recipe-search");
  const term = input.value.trim();

  if (term === "") {
    return;
  }

  console.log(`Searching for: ${term}`);
  // TODO: hook this up to real recipe data/filtering.
});