const apiKey = "aWLvikLl3S4vpRzaOj833VdFbE3jRTZS";

async function searchGIF() {
  const query = document.getElementById("searchInput").value;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=10&rating=g`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    const gifs = result.data;

    const gifContainer = document.getElementById("gifContainer");
    gifContainer.innerHTML = "";

    gifs.forEach(gif => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url;
      gifContainer.appendChild(img);
    });
  } catch (error) {
    console.error("Failed to fetch GIFs:", error);
  }
}
