let jsonData;

fetch("travel_recommendation_api.json")
  .then((res) => res.json())
  .then((data) => (jsonData = data));

function search() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  const matches = [];

  ["countries", "temples", "beaches"].forEach((category) => {
    if (!jsonData[category]) return;
    jsonData[category].forEach((item) => {
      if (category === "countries") {
        item.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(query)) {
            matches.push(city);
          }
        });
      } else if (item.name.toLowerCase().includes(query)) {
        matches.push(item);
      }
    });
  });

  if (matches.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  matches.forEach((loc) => {
    resultsDiv.innerHTML += `
      <div class="result-item">
        <h3>${loc.name}</h3>
        <img src="images/${loc.imageUrl}" alt="${loc.name}" />
        <p>${loc.description}</p>
      </div>`;
  });
}

function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
}
